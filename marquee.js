(function($, win) {
  /*文案过长时以跑马灯效果展示*/
  $.prototype.marqueeCss = function(data) {
    var speed = data && data.speed || 10;
    var dom = $(this);
    var inHtml = dom.html();
    var inWidth = data && data.width || dom.outerWidth();
    dom.attr('style', 'position: fixed;display:block;width:auto;word-break: keep-all;white-space: nowrap;');
    var inHeight = data && data.height || dom.innerHeight(), outWidth = dom.outerWidth();
    if (outWidth >= inWidth) {
      dom.attr('style', 'position:relative;display:inline-block;overflow: hidden;width:' + inWidth + 'px;height:' +
          inHeight + 'px').html('<div class=\'marquee\'>' + inHtml + '</div>');
      var marqueeStyle = '.marquee{position:absolute;left:' + -1 * outWidth + 'px;display:inline-block;width:' +
          outWidth +
          'px;padding:0;overflow:hidden;-webkit-animation:marquee-animate 10s linear 0s infinite;animation:marquee-animate ' +
          speed + 's linear 0s infinite}' +
          '@-webkit-keyframes marquee-animate{0%{left:100%}100%{left:' + -1 * outWidth + 'px}}' +
          '@keyframes marquee-animate{0%{left:100%}100%{left:' + -1 * outWidth + 'px}}';
      if ($('#marquee-style').html()) {
        $('#marquee-style').html(marqueeStyle);
      } else {
        $('body').append('<style id=\'marquee-style\'>' + marqueeStyle + '</style>');
      }
    } else {
      dom.attr('style', '');
    }
  };

  $.prototype.marqueeJs = function(data) {
    var speed = data && data.speed || 100,
        dom = $(this),
        inHtml = dom.html(),
        inWidth = data && data.width || dom.outerWidth(),
        itemMargin = 50,
        delay = data.delay ? data.delay : 0;
    dom.attr('style', 'position: fixed;display:block;width:auto;word-break: keep-all;white-space: nowrap;');
    var inHeight = data && data.height || dom.innerHeight(), outWidth = dom.outerWidth();
    if (outWidth >= inWidth) {
      var itemWidth = outWidth + itemMargin;
      dom.attr('style', 'position: relative;display:inline-block;overflow:hidden;width:' + inWidth + 'px;height:' +
          inHeight + 'px');
      dom.html('<span style=\'position:absolute;top:0;left:' + inWidth + 'px;width:' + itemWidth + 'px;\'>' + inHtml +
          '</span>' +
          '<span style=\'position:absolute;top:0;left:' + (inWidth + itemWidth) + 'px;width:' + itemWidth + 'px;\'>' +
          inHtml + '</span>');
      var leftItem = dom.find('span')[0],
          rightItem = dom.find('span')[1];

      function marqueeToDo() {
        leftItem.style.left = (parseInt(leftItem.style.left) - 1) + 'px';
        rightItem.style.left = (parseInt(rightItem.style.left) - 1) + 'px';
        if (parseInt(leftItem.style.left) <= -1 * itemWidth) {
          leftItem.style.left = '0px';
          rightItem.style.left = itemWidth + 'px';
        }
      }

      setTimeout(function() {
        setInterval(marqueeToDo, speed);
      }, delay);
    } else {
      dom.attr('style', '');
    }
  };

  var isHTMLElement = ( typeof HTMLElement === 'object' ) ?
      function(obj) {
        return obj instanceof HTMLElement;
      } :
      function(obj) {
        return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
      };

  var marqueeJs = function(dom, options) {
    if (!isHTMLElement(dom)) return;
    var speed = options && options.speed || 100,
        inHtml = dom.innerHTML,
        inWidth = options && options.width || dom.offsetWidth,
        itemMargin = 50,
        delay = options.delay ? options.delay : 0;
    var domStyle = dom.hasAttribute('style')?dom.getAttribute('style'):'';
    dom.setAttribute('style', 'position: fixed;display:block;width:auto;word-break: keep-all;white-space: nowrap;');
    var inHeight = options && options.height || dom.clientHeight,
        outWidth = dom.offsetWidth;
    if (outWidth >= inWidth) {
      var itemWidth = outWidth + itemMargin;
      dom.setAttribute('style', domStyle + 'position: relative;display:inline-block;overflow:hidden;width:' + inWidth + 'px;height:' + inHeight + 'px');

      var leftItem = document.createElement('span'),
          rightItem = document.createElement('span');
      leftItem.setAttribute('style', 'position:absolute;top:0;left:' + inWidth + 'px;width:' + itemWidth + 'px;');
      leftItem.innerHTML = inHtml;
      rightItem.setAttribute('style', 'position:absolute;top:0;left:' + (inWidth + itemWidth) + 'px;width:' + itemWidth + 'px;');
      rightItem.innerHTML = inHtml;

      dom.innerHTML = '';
      dom.appendChild(leftItem);
      dom.appendChild(rightItem);

      function marqueeToDo() {
        leftItem.style.left = (parseInt(leftItem.style.left) - 1) + 'px';
        rightItem.style.left = (parseInt(rightItem.style.left) - 1) + 'px';
        if (parseInt(leftItem.style.left) <= -1 * itemWidth) {
          leftItem.style.left = '0px';
          rightItem.style.left = itemWidth + 'px';
        }
      }

      setTimeout(function() {
        setInterval(marqueeToDo, speed);
      }, delay);
    } else {
      dom.setAttribute('style', domStyle);
    }
  };

  win.marqueeJs = marqueeJs;
})(jQuery, window);