/*!
  topStickler.js 1.0.0
  license: GNU GENERAL PUBLIC LICENSE
  https://github.com/marcosven/topStickler.js
*/

var topStickler = function () {

  var self = this,
      marco = window,
      storage = {},
      getElement = function ( el ) {

        return ( typeof el === "string" ? document.querySelectorAll( el )[0] : typeof HTMLElement === "object" ? el instanceof HTMLElement : el && typeof el === "object" && el !== null && el.nodeType === 1 && typeof el.nodeName === "string" ? el : false );

      }

  this.stickIt = function ( el, max_screen_size, sticky_class ) {
    let sticky_element = getElement( el ),
        max_screen = max_screen_size || 0,
        cls = sticky_class || 'stick-to-top',
        setStickyPos = function (){

          return storage.el.getBoundingClientRect().top + ( marco.pageYOffset || document.documentElement.scrollTop );

        },
        addClass = function (){

          storage.el.className += ' ' + storage.cl;

        },
        removeClass = function (){

          storage.el.className = storage.el.className.replace( new RegExp( storage.cl + '\\s*', 'gi'), '').trim();

        },
        handlerFunc = function ( e ) {

          let el = storage.el;

          if ( marco.innerWidth <= max_screen ) {

            removeClass();

            return;

          }

          if ( e !== undefined && e.type === 'resize' ) {

            removeClass();

            el.stick_pos = setStickyPos();

            addClass();

          }

          helper();

        },
        helper = function () {

          let el = storage.el,
              cls = storage.cl,
              stick_pos = el.stick_pos,
              scroll_pos = document.documentElement.scrollTop,
              rect = el.getBoundingClientRect(),
              visible = (
                rect.top <= 0
              ),
              has_class = (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1 ? true : false;

          if ( visible && ! has_class ) {

            addClass();

          } else if ( el.stick_pos > scroll_pos && has_class ) {

            removeClass();

          }

        };

    if ( sticky_element ) {

      if ( storage.ev !== undefined ) {

        let handler = storage.ev;

        marco.removeEventListener( 'DOMContentLoaded', handler, false );

        marco.removeEventListener( 'scroll', handler, false );

        marco.removeEventListener( 'resize', handler, false );

        removeClass()

      }

      let EventHandler = typeof _ === 'function' ? _.throttle( function(e){ handlerFunc(e) }, 150) : function(e){ handlerFunc(e); };

      storage.el = sticky_element;

      storage.ev = EventHandler;

      storage.cl = cls;

      sticky_element.stick_pos = setStickyPos();

      marco.addEventListener( 'DOMContentLoaded', EventHandler, false );

      marco.addEventListener( 'scroll', EventHandler, false );

      marco.addEventListener( 'resize', EventHandler, false );

      handlerFunc();

    }

  };

};
