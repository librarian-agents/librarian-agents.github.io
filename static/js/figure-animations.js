/* GIF figure playback: load visible animations, with an accessible still-image option. */
(function () {
  'use strict';

  function initGifFigures(doc, win) {
    var figures = [];
    var destroyed = false;
    var observer = null;
    var framePending = false;
    var motionQuery = win.matchMedia ? win.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var reduceMotion = Boolean(motionQuery && motionQuery.matches);

    function inViewport(element) {
      var rect = element.getBoundingClientRect();
      var height = win.innerHeight || doc.documentElement.clientHeight;
      var width = win.innerWidth || doc.documentElement.clientWidth;
      return rect.bottom > 0 && rect.top < height && rect.right > 0 && rect.left < width;
    }

    function render(state) {
      var playing = !destroyed && !state.failed && state.wantsToPlay && state.visible && !doc.hidden;
      var source = playing ? state.gifSource : state.stillSource;
      state.playing = playing;
      // Reassigning a GIF can restart it; leave the current source alone unless it changes.
      if (state.image.getAttribute('src') !== source) state.image.setAttribute('src', source);
      state.figure.classList.toggle('is-playing', playing);
      state.label.textContent = state.failed ? 'Animation unavailable' : (playing ? 'Show still figure' : 'Play animation');
      state.button.disabled = state.failed;
    }

    Array.prototype.forEach.call(doc.querySelectorAll('[data-gif-figure]'), function (figure) {
      if (figure.classList.contains('is-enhanced')) return;
      var image = figure.querySelector('[data-gif-media]');
      var button = figure.querySelector('[data-gif-toggle]');
      if (!image || !button) return;
      var gifSource = image.getAttribute('data-gif-src');
      var stillSource = image.getAttribute('data-still-src') || image.getAttribute('src');
      if (!gifSource || !stillSource) return;
      var state = {
        figure: figure,
        image: image,
        button: button,
        label: button.querySelector('[data-gif-toggle-label]') || button,
        status: figure.querySelector('[data-gif-status]'),
        gifSource: gifSource,
        stillSource: stillSource,
        visible: false,
        wantsToPlay: !reduceMotion,
        playing: false,
        failed: false
      };
      state.onToggle = function () {
        if (state.failed || destroyed) return;
        state.wantsToPlay = !state.playing;
        // A visible control may be clicked before the observer's first callback.
        state.visible = inViewport(state.figure);
        render(state);
      };
      state.onError = function () {
        // A still-image failure is unrelated to GIF playback, and aborted requests
        // must not disable a figure after it has already switched back to its still.
        if (!state.playing || state.image.getAttribute('src') !== state.gifSource) return;
        state.failed = true;
        state.wantsToPlay = false;
        state.figure.classList.add('has-animation-error');
        if (state.status) {
          state.status.textContent = 'Animation unavailable. Showing the still figure.';
          state.status.hidden = false;
        }
        render(state);
      };
      if (state.status) state.status.hidden = true;
      button.addEventListener('click', state.onToggle);
      image.addEventListener('error', state.onError);
      figure.classList.add('is-enhanced');
      figures.push(state);
      render(state);
    });

    function updateVisibility() {
      framePending = false;
      if (destroyed) return;
      figures.forEach(function (state) {
        state.visible = inViewport(state.figure);
        render(state);
      });
    }

    function scheduleVisibility() {
      if (framePending || destroyed) return;
      framePending = true;
      if (win.requestAnimationFrame) win.requestAnimationFrame(updateVisibility);
      else updateVisibility();
    }

    if (win.IntersectionObserver) {
      observer = new win.IntersectionObserver(function (entries) {
        if (destroyed) return;
        entries.forEach(function (entry) {
          var state = figures.find(function (item) { return item.figure === entry.target; });
          if (!state) return;
          state.visible = entry.isIntersecting && entry.intersectionRatio > 0;
          render(state);
        });
      }, { threshold: [0, 0.01] });
      figures.forEach(function (state) { observer.observe(state.figure); });
    } else {
      updateVisibility();
      win.addEventListener('scroll', scheduleVisibility, { passive: true });
      win.addEventListener('resize', scheduleVisibility);
    }

    function onVisibilityChange() {
      figures.forEach(render);
    }

    function onMotionChange(event) {
      // An explicit request to play is allowed with reduced motion. Enabling
      // reduced motion later stops playback until the user chooses to play again.
      if (event.matches) {
        figures.forEach(function (state) { state.wantsToPlay = false; });
        figures.forEach(render);
      }
    }

    doc.addEventListener('visibilitychange', onVisibilityChange);
    if (motionQuery) {
      if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionChange);
      else if (motionQuery.addListener) motionQuery.addListener(onMotionChange);
    }

    return {
      destroy: function () {
        if (destroyed) return;
        destroyed = true;
        if (observer) observer.disconnect();
        win.removeEventListener('scroll', scheduleVisibility);
        win.removeEventListener('resize', scheduleVisibility);
        doc.removeEventListener('visibilitychange', onVisibilityChange);
        if (motionQuery) {
          if (motionQuery.removeEventListener) motionQuery.removeEventListener('change', onMotionChange);
          else if (motionQuery.removeListener) motionQuery.removeListener(onMotionChange);
        }
        figures.forEach(function (state) {
          state.button.removeEventListener('click', state.onToggle);
          state.image.removeEventListener('error', state.onError);
          render(state);
          state.figure.classList.remove('is-enhanced');
        });
      }
    };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { initGifFigures: initGifFigures };
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    var start = function () { initGifFigures(document, window); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
  }
})();
