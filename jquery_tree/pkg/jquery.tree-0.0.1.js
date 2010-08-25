
function load_styles_jquery_tree() {
  jQuery("head").append("<style>.tree .inspected> button.toggle{background-image:url(icons/close.png)}.tree .empty button.toggle{background:none}.tree .toggle{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;width:16px;height:16px;top:2px}.tree .toggle.closed{background-image:url(icons/open.png) !important}.tree.empty > button.toggle{visibility:hidden}li.inspected> button.disable{background-color:transparent;background-image:url(icons/block.png)}li button.disable{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px}li button.disable.active{background-image:url(icons/active_block.png)}li.inspected> button.destroy{background-color:transparent;background-image:url(icons/small_cross.png)}li button.destroy{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px;opacity:.5}li button.destroy:hover{opacity:1}li.tree_node label{display:inline}li.tree_node label,li.tree_node input.tag_name{color:blue;font-weight:bold}li.tree_node .element{display:inline;position:relative;line-height:20px}li.tree_node .element:before,li.tree_node .element:after{color:#999}li.tree_node .element:before{content:\"<\"}li.tree_node .element:after{content:\">\"}li.tree_node .element *{cursor:text}li.tree_node .id{display:inline;color:red}li.tree_node .id:before,li.tree_node .id_input:before{content:\"#\"}li.tree_node .classes{color:green}li.tree_node ul.classes{display:inline;padding:0;margin:0}li.tree_node ul.classes li{padding:0;margin:0;background:transparent;display:inline}li.tree_node ul.classes li:before{content:\".\";color:black;font-weight:bold}li.tree_node input.attr{color:blue}li.tree_node input.value{color:red}li.tree_node .attributes,li.tree_node dd,li.tree_node dt{display:inline;margin:0;padding:0}li.tree_node .attributes> li,li.tree_node dd> li,li.tree_node dt> li{margin:0;padding:0;display:inline}li.tree_node dt{color:blue;margin-left:.3em}li.tree_node dt:after{content:\"=\";color:black}li.tree_node dd{color:red}li.tree_node dd:before,li.tree_node dd:after{content:'\"';color:black}li.tree_node .source{display:inline;position:relative;line-height:20px}li.tree_node .source *{cursor:text}.tree{list-style:none;padding:0px;margin:0px;font-size:12px;font-family:monospace}.tree .tree_node{line-height:20px;padding-left:10px;white-space:nowrap;display:block;clear:both;margin-left:0px}.tree input{border:2px solid black;border-top:0;border-bottom:0;margin:0;padding:0;-moz-border-radius:5px;padding-left:5px;background-color:#fffaaa;font-size:12px;font-family:monospace}.tree .inspected{background-color:#fcc}.tree .inspected .tree_node{background-color:white}.tree .disabled div,.tree .disabled div *{opacity:.5}.tree ol,.tree ul{list-style:none}.tree ol{white-space:nowrap;background-color:white;padding:0}</style>");
}
if(document.body) load_styles_jquery_tree();
else jQuery(load_styles_jquery_tree);
      

if(!jQuery.tree) jQuery.tree = {};

jQuery.tree.toggle_button = jQuery("<button class='toggle'></button>");

jQuery.tree.disable_button = jQuery("<button class='disable'></button>");

jQuery.tree.destroy_button = jQuery("<button class='destroy'></button>");

jQuery.tree.tag_name_button = jQuery("<button class='tag_name'></button>");

jQuery.tree.tag_name_input = jQuery("<input class='tag_name' type='text' />");

jQuery.tree.tag_name_label = jQuery("<label class='tag_name'></label>");

jQuery.tree.dom_node = jQuery("<li class='tree_node empty'>  <div class='element'></div>  <ol></ol></li>");

jQuery.tree.id_label = jQuery("<div class=\"id\"/>");

jQuery.tree.id_input = jQuery("<input class='id' type='text' />");

jQuery.tree.classes_input = jQuery("<input class='classes' type='text' />");

jQuery.tree.classes_label = jQuery("<ul class=\"classes\"/>");

jQuery.tree.attr_input = jQuery("<input class='attr' type='text' />");

jQuery.tree.attributes_label = jQuery("<dl class=\"attributes\"></dl>");

jQuery.tree.value_input = jQuery("<input class='value' type='text' />");

jQuery.tree.attribute_label = jQuery("<li>  <dt class='attr'></dt>  <dd class='value'></dd></li>");

jQuery.tree.tree_node_input = jQuery("<input class='tree_node' type='text' />");

jQuery.tree.code_node_label = jQuery("");

jQuery.tree.code_node_input = jQuery("<input class='code_node' type='text' />");

jQuery.tree.code_node = jQuery("<li class='code_node empty'>  <div class='source'></div>  <ol></ol></li>");

jQuery.tree.autocomplete_list = jQuery("<ol class='autocomplete'></ol>");

jQuery.tree.autocomplete_item = jQuery("<li></li>");

jQuery.tree.tree_node_input = jQuery("<input class='label' type='text' />");

jQuery.tree.tree_node = jQuery("<li class='tree_node empty'>  <span class='label'></span>  <ol></ol></li>");

console.log('/home/collin/code/jquery_tree/lib/plugins/toggle/toggle.js');
;(function(_) {
  var closed_class = 'closed'
    ,expand_event = 'expand'
    ,collapse_event = 'collapse';
  _.tree.animate = true;
  
  _.tree.init_toggle_plugin = function(tree, options) {
    var slot;
    for(slot in options.node)
      options.node[slot].prepend(_.tree.toggle_button.deep_clone(true));
    return this;
  };
  
  _.fn.extend({
    toggle_button: function() {
      return this.find('.toggle:first');
    }
    
    ,toggle_click: function(el, node) {
      if(el.hasClass(closed_class)) {
        node.trigger(expand_event);
        node.expand_children(_.tree.animate);
      }
      else {
        node.trigger(collapse_event);
        node.collapse_children(_.tree.animate);
      }
    }

    ,collapse_children: function(slide) {
      if(slide)
        this.child_list().slideUp();
      else
        this.child_list().hide();
      this.toggle_button().addClass(closed_class);
      return this;
    }
    
    ,expand_children: function(slide) {
      if(slide)
        this.child_list().slideDown();
      else
        this.child_list().show();
      this.toggle_button().removeClass(closed_class);
      return this;
    }
  });
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/disable/disable.js');
;(function(_) {
  var active_class = 'active'
    ,disable_event = 'disable'
    ,enable_event = 'enable';
  
  _.tree.init_disable_plugin = function(tree, options) {
    var slot;
    for(slot in options.node)
      options.node[slot].prepend(_.tree.disable_button.deep_clone(true));
    return this;
  };
  
  _.fn.extend({
    disable_button: function() {
      return this.find('.disable:first');
    }
    
    ,disable_click: function(el, node) {
      el.toggleClass(active_class);
      if(el.hasClass(active_class)) 
        node
          .addClass('disabled')
          .trigger(disable_event);
      else 
        node
          .removeClass('disabled')
          .trigger(enable_event); 
    }
  });
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/destroy/destroy.js');
;(function(_) {
  var destroy_event = 'destroy'

  _.tree.init_destroy_plugin = function(tree, options) {
    var slot;
    for(slot in options.node)
      options.node[slot].prepend(_.tree.destroy_button.deep_clone(true));
    return this;
  };
  
  _.fn.extend({
    destroy_button: function() {
      return this.find('.destroy:first');
    }
    
    ,destroy_click: function(el, node) {
      node.trigger(destroy_event);
      node.remove();
    }
  });
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/tag_name/tag_name.js');
;(function(_) {
  _.tree.tag_name_label.click(function(e) {
    _(this).fn('edit');
  });
  
  jQuery.fn.whitelist = function(expr) {
    return this.keypress(function(e) {
      if( e.charCode > 0 
      && !String.fromCharCode(e.which).match(expr)) e.preventDefault();
    })
  }
  
  _.tree.tag_name_input
    .hide()
    .keypress_size_to_fit()
    .whitelist(/[a-z\d]/)
    .keybind('tab',      function(e) { 
      e.preventDefault();
      _(this).next().fn('edit'); 
    })
    .keybind('shift+tab', function(e) {
      e.preventDefault(); 
      _(this).prev().fn('edit'); 
    });
  
  _.tree.init_tag_name_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.tag_name_label.deep_clone(true));
    options.tag_name_input = _.tree.tag_name_input.clone(true);
  }
  
  _.tree.tag_name_label.fn({
    edit: function() {
      var node = _(this).parent_node();
      node.trigger('edit_tag_name');
      return node.edit_label({
        label: node.tag_name_label()
        ,input: node.tree().data('tree.options').tag_name_input
        ,default_value: 'div'
        ,commit: function(options) {
          var _this = _(this);
          if(!_this.val().match(_.tree.tag_names_regex)) {
            console.warn(_this.val(), "is not a valid tag name");
            _this.val(options.default_value);
          }
        }
        ,autocomplete: {
          collection: _.tree.tag_names
        }
      });
    }
    
    ,to_haml: function() {
      return '%' + _(this).text();
    }
  });
  
  _.fn.extend({
    tag_name_label: function() {
      return this.find('label:first');
    }
  });
  
  _.tree.tag_names = "A,ABBR,ACRONYM,ADDRESS,APPLET,AREA,B,BASE, BASEFONT,BDO,BIG,BLOCKQUOTE,BODY,BR,BUTTON,CAPTION,CENTER,CITE,CODE,COL, COLGROUP,DD,DEL,DFN,DIR,DIV,DL,DT,EM,FIELDSET,FONT,FORM,FRAME, FRAMESET,H1,H2,H3,H4,H5,H6,HEAD,HR,HTML,I,IFRAME,IMG,INPUT,INS,ISINDEX,KBD,LABEL,LEGEND,LI,LINK,MAP,MENU,META, NOFRAMES, NOSCRIPT,OBJECT,OL, OPTGROUP,OPTION,P,PARAM,PRE,Q,S,SAMP,SCRIPT,SELECT,SMALL,SPAN,STRIKE,STRONG,STYLE,SUB,SUP,TABLE,TBODY,TD, TEXTAREA,TFOOT,TH,THEAD,TITLE,TR,TT,U,UL,VAR".toLowerCase().split(',');
  _.tree.tag_names_regex = new RegExp('^('+_.tree.tag_names.join('|')+')$');
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/dom_node/dom_node.js');
;(function(_) {
  _.tree.dom_node.fn({
    edit: function() {
      var _this = _(this);
      _this.tag_name_label().fn('edit');
      return _this;
    }
    
    ,paint: function(data) {
      var _this = _(this)
        ,defaults = _.extend({}, {
          tag_name: 'div'
          ,id: ''
        })
        ,data = _.extend(defaults, data);
      
      if(_this.child_list().children().length) _this.removeClass('empty');
      
      _this.tag_name_label().html(data.tag_name);
      _this.id_label().html(data.id).hide_if_empty();
      if(data.classes)
        _this.class_list().append(_.array_to_classes_dom(data.classes));
      if(data.attributes)
        _this.attribute_list().append(_.object_to_attributes_dom(data.attributes));
      return _this;
    }
    
    ,to_haml: function(indent) {
      var _this = _(this);
      
      return indent 
        + _this
            .find('.element')
              .serialize_children_to_haml()
        + "\n"
        + _this
            .child_list()
              .serialize_children_to_haml(indent);
    }
  });
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/id/id.js');
;(function(_) {
  _.tree.id_label.click(function(e) {
    e.preventDefault();
    _(this).fn('edit');
  });
  
  _.tree.id_input
    .hide()
    .keypress_size_to_fit()
    .whitelist(/[a-z-_\d]/)
    .keybind('tab',      function(e) {
      e.preventDefault(); 
      _(this).next().fn('edit'); 
    })
    .keybind('shift+tab', function(e) { 
      e.preventDefault();
      _(this).prev().prev().fn('edit'); 
    });
  
  _.tree.init_id_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.id_label.deep_clone(true));
    options.id_input = _.tree.id_input.clone(true);
  };

  _.tree.id_label.fn({
    edit: function() {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      var node = _(this).parent_node();
      node.trigger('edit_id');
      return node.edit_label({
        label: node.id_label()
        ,input: node.tree().data('tree.options').id_input
        ,hide_if_empty: true
        ,do_not_hide_label: true
      });
    }
    
    ,to_haml: function() {
      var _this = _(this);
      if(_this.blank()) return ''
      return '#' + _this.text();
    }
  });
  
  _.fn.extend({
    id_label: function() {
      return this.find('.id:first');
    }
  });
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/classes/classes.js');
;(function(_) {
  _.tree.classes_label.click(function(e) {
    e.preventDefault();
    _(this).edit_class(_(e.target));

  });
  
  _.tree.classes_input
    .hide()
    .keypress_size_to_fit()
    .whitelist(/[a-z-_\d]/)
    .keybind('tab', function(e) { 
      e.preventDefault();
      var _this = _(this);
      _this.parent().next_class(_this.prev());
    })
    .keybind('shift+tab', function(e) {
      e.preventDefault();
      var _this = _(this);
      _this.parent().previous_class(_this.prev());
    });
      
  _.tree.init_classes_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.classes_label.deep_clone(true));
    options.classes_input = _.tree.classes_input.clone(true);
  };

  _.tree.classes_label.fn({
    edit: function(last) {
      var _this = _(this);
      if(last) {
        var last_class = _this.parent_node().last_class();
        if(last_class.length) return _this.edit_class(last_class);
      }
      else {
        var first_class = _this.parent_node().first_class();
        if(first_class.length) return _this.edit_class(first_class);
      }
      return _this.new_class();    
    }
    
    ,to_haml: function() {
      var classes = _(this).children();
      if(!classes.length) return '';
      return '.' + classes.map(function() {
        return _(this).text();
      }).join('.');
    }
  });
  
  _.fn.extend({
    class_list: function() {
      if(this.hasClass('classes')) return this;
      return this.find('.classes:first');
    }

    ,edit_class: function(cls) {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      var node = this.parent_node();
      node.trigger('edit_class');
      return node.edit_label({
        label: cls
        ,input: node.tree().data('tree.options').classes_input
        ,remove_if_empty: true
        ,do_not_hide_label: true
      });    
    }
  
    ,new_class: function() {
      var cls = _('<li class="class">');
      this.class_list().append(cls);
      return this.edit_class(cls);
    }
  
    ,previous_class: function(cls) {
      var prev = cls.prev('li');
      if(prev.length) return this.edit_class(prev);
      return this.prev().fn('edit');
    }
    
    ,next_class: function(cls) {
      var next = cls.next().next();
      if(next.length) return this.edit_class(next);
      return this.next().fn('edit');
    }
  
    ,class_string: function() {
      var classes = this.class_list().children().map(function() {
        var _this = _(this);
        if(_this.is('input')) return _this.val(); 
        return _this.text();    
      });
      return classes.join(' ');
    }
    
    ,classes_to_dom: function() {
      var dom = _.array_to_classes_dom(this.classes());
      return dom[0] === document ? null : dom;
    }
  
    ,last_class: function() {
      return this.class_list().find('li:last');
    }
    
    ,first_class: function() {
      return this.class_list().find('li:first');
    }
  });
  
  _.array_to_classes_dom = function(array) {
    return _(array.map(function(cls) {
      return '<li class="class">'+cls+'</li>';
    }).join(''));
  }
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/attributes/attributes.js');
;(function(_) {
  _.tree.attributes_label.click(function(e) {
    e.preventDefault();
    var el = _(e.target)
      ,_this = _(this)
      ,attr = el.parent();
    if(el.is('dt')) _this.edit_attr(attr);
    if(el.is('dd')) _this.edit_value(attr); 
  });
 
  function edit_value(e) {
    e.preventDefault();
    var _this = _(this);
    _this.parent_node().edit_value(_this.parent());
  }
 
  _.tree.attr_input
    .hide()
    .whitelist(/[a-z-_]/)
    .keypress_size_to_fit()
    .keybind('tab', edit_value)
    .keybind('shift+tab', function(e) {
      e.preventDefault(); 
      var _this = _(this);
      _this.parent_node().previous_attr(_this.parent());
    })
    .keybind('space', edit_value)
    .keybind('=', edit_value);
 
  _.tree.value_input
    .hide()
    .keypress_size_to_fit()
    .keybind('tab', function(e) {
      e.preventDefault();
      var _this = _(this);
      _this.parent_node().next_attr(_this.parent());
    })
    .keybind('shift+tab', function(e) {
      e.preventDefault();
      var _this = _(this);
      _this.parent_node().edit_attr(_this.parents('li:first'));
    });
  
  _.tree.init_attributes_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.attributes_label.deep_clone(true));
    options.attr_input = _.tree.attr_input.clone(true);
    options.value_input = _.tree.value_input.clone(true);
  };
    
  _.tree.attributes_label.fn({
    edit: function() {
      var _this = _(this)
        ,first_attr = _this.find('li:first');
      
      if(first_attr.length) return _this.edit_attr(first_attr);
      
      return _this.new_attr();  
    }
    
    ,to_haml: function() {
      var _this = _(this)
        ,attrs = _this.children();

      if(!attrs.length) return '';

      return '{'
        + attrs.map(function(){
            var __this = _(this)
            return '"'
              + __this.find('dt').text()
              + '" => "'
              + __this.find('dd').text()
              + '"'
          }).join(', ')
        +'}';
    }
  });
  
  _.fn.extend({
    attribute_list: function() {
      return this.find('.attributes:first');
    }
    
    ,new_attr: function() {
      var attr = _('<li><dt class="attr"><dd class="value"></li>');
      this.append(attr);
      return this.edit_attr(attr);
    }
    
    ,previous_attr: function(attr) {
      var prev = attr.prev('li');
      if(prev.length) return this.edit_value(prev);
      attr.parent().prev().fn('edit', 'last');
    }
    
    ,next_attr: function(attr) {
      var next = attr.parent().next('li');
      if(next.length) return this.edit_attr(next);
      return this.attribute_list().new_attr();
    }
    
    ,edit_attr: function(label) {
      label.parent_node().trigger('edit_attr');
      return this.edit_label({
        label: label.find('dt')
        ,input: label.tree().data('tree.options').attr_input
        ,insertion_method: 'before'
        ,if_empty: function() {this.parent().remove()}
        ,do_not_hide_label: true
      });
    }
    
    ,edit_value: function(label) {
      label.parent_node().trigger('edit_value');
      return this.edit_label({
        label: label.find('dd')
        ,input: label.tree().data('tree.options').value_input
        ,insertion_method: 'append'
        ,do_not_hide_label: true
      });
    }    
    
    ,attributes_to_dom: function() {
      var attrs = {} 
      
      _(this[0].attributes).each(function(which, attr) {
        if(!this.name.match(/^(id|class)$/)) {
          attrs[this.name] = this.value;
        }
      });
      
      var dom = _.object_to_attributes_dom(attrs);
      return dom[0] === document ? null : dom; 
    }
  });
  
  _.object_to_attributes_dom = function(object) {
    var dom_string = "", dom, slot;
    for(slot in object)
      dom_string += '<li><dt class="attr">'+slot+'</dt><dd class="value">'+object[slot]+'</dd></li>';
    dom = _(dom_string);
    dom.each(function() {
      var attr = _(this).find('dt');
      attr.data('tree.attr.last', attr.text());
    });
    return dom;
  };
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/html_editor/html_editor.js');
;(function(_) {

  function new_class(e) {
    e.preventDefault();
    _(this).parent_node().new_class();
  }

  function edit_id(e) {
    e.preventDefault();
    _(this).parent_node(e).id_label().fn('edit');
  }
  
  function edit_tag_name(e) {
    e.preventDefault();
    _(this).parent_node().tag_name_label().fn('edit');
  }
  
  function new_attribute(e) {
    e.preventDefault();
    _(this).parent_node().attribute_list().new_attr();
  }
  
  function bind_input_listeners(options) {
    with(options) {
      classes_input
        .keybind('<', edit_tag_name)
        .keybind('#', edit_id)
        .keybind('.', new_class)
        .keybind('=', new_attribute)
        .keybind('space', new_class);
      id_input
        .keybind('<', edit_tag_name)
        .keybind('=', new_attribute)
        .keybind('.', new_class);
      tag_name_input
        .keybind('<', edit_tag_name)
        .keybind('#', edit_id)
        .keybind('=', new_attribute)
        .keybind('.', new_class);
    }
  }


  _.tree.init_html_editor_plugin = function(tree, options) {
    var html_editor_plugins = 'tag_name id classes attributes'.split(/ /);
    options.plugins = options.plugins.concat(html_editor_plugins);
    options.node.dom = _.tree.dom_node.deep_clone(true);
    tree.init_tree_plugins(html_editor_plugins, options);
    bind_input_listeners(options);
    tree.interactive_editing({
      navigation_selector: '.element:first'
    });
  };
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/code_editor/code_editor.js');
/*

a = 1
b = 3

for simple codez like this:
operands
  ==, ===, !==, ||, &&, +, -, *
assignment
  =
if
unless
else
objects in scope
fun() {}
def
dot.access
.implied_access
#{interpolation} -> .#{}
@ttributes
&
:events
= fall through javascript?
- eval javascript?
$

*/

;(function(_) {
  _.tree.init_code_editor_plugin = function(tree, options) {
  
  };
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/editable/editable.js');
;(function(_) {
  _.fn.interactive_editing = function(options) {
  
    var options = _.extend({
      navigation_selector: ''
      ,default_node_type: undefined
    }, options);
  
    function navigate() {
      var method = [].shift.apply(arguments)
        ,args = arguments;
        
      return node_and_input(function(node, input) {
        var found = _.fn[method].apply(node, args)
          ,label, intermediate;
        
        if(!found.length && method == 'prev') {
          found = input.parent_node().parent_node();
        }

        if(method == 'next') {
          intermediate = input.parent_node().log();
          if(intermediate.child_list().children().length) {
            found = intermediate.child_list().children(':first');
          }
          else if(!found.length) {
            found = intermediate.parent_node().next();
          }
        }
          
        if(found.is('ol')) found = found.children('.tree_node:first');
        label = found.find(options.navigation_selector+':first .'+input.attr('class')+':first')
        if(label.length) label.fn('edit');
        else found.fn('edit');
      });
    }
  
    return this
      .dblclick(function() {
        _(this)
          .create_node()
            .fn('edit');
      })
      .keybind('esc', function(e) {
        _(e.target).blur();
      })
      .keybind('enter', node_insert_and_edit('create_node_after'))
      .keybind('shift+enter', node_insert_and_edit('create_node'))
      .keybind('up', navigate('prev', 'li'))
      .keybind('down', navigate('next', 'li'))
      .keybind('ctrl+up', navigate('prev', 'li'))
      .keybind('ctrl+down', navigate('next', 'li'))
      .keybind('ctrl+left', navigate('parent_node'))
      .keybind('ctrl+right', navigate('child_list'))
      .keybind('ctrl+shift+up', node_and_focus_input(function(node, input) {
        node.prev('li').before(node);
        node.trigger('moveup');
      }))
      .keybind('ctrl+shift+down', node_and_focus_input(function(node, input) {
        node.next('li').after(node);
        node.trigger('movedown');
      }))
      .keybind('ctrl+shift+left', node_and_focus_input(function(node, input) {
        var parent = node.parent_node();
        parent.before(node);
        if(parent.child_list().blank()) parent.addClass('empty');
        node.trigger('moveout');
      }))
      .keybind('ctrl+shift+right', node_and_focus_input(function(node, input) {
        node.next()
          .removeClass('empty')
          .child_list().prepend(node);
        node.trigger('movein');
      }));
  };

  _.tree.tree_node.children('span')
    .fn({
      edit: function() {
        var node = _(this).parent_node();
        node.trigger('edit');
        node.edit_label({
          label: node.label()
          ,input: node.tree().data('tree.options').tree_node_input
          ,if_empty: function() {
            node.remove();  
          }
        });
      }
    })
    .click(function(e) {
      _(this).fn('edit');
    });

  _.tree.tree_node_input
    .hide()
    .keypress_size_to_fit()

  _.tree.init_editable_plugin = function(tree, options) {
    tree.interactive_editing();
    options.tree_node_input = _.tree.tree_node_input.deep_clone(true);
  };
  
  function node_insert_and_edit(insertion_method) {
    return function(e) {
      e.preventDefault();
      var node = _(e.target).parent_node();
      node[insertion_method]().fn('edit');
    }
  }
  
  function node_and_input(fn) {
    return function(e) {
      e.preventDefault();
      var input = _(e.target)
        ,node = input.parent_node();
      fn(node, input, e);
    } 
  }
  
  function node_and_focus_input(fn) {
    return node_and_input(function(node, input, e) {
      e.preventDefault();
      fn(node, input, e);
      input.focus();
    });
  }
  
  _.fn.extend({
/*
  label: the jqueried label
  input: the jqueried input elment

  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
  autocomplete: {
    collection: [] Array of strings to autocomplete on
  }
*/
    edit_label: function(opts) {
      var label = opts.label
        ,input = opts.input
        ,_this = _(this);

      _(document.body).blur_all();
      input.val(label.text());
      
      if(opts.do_not_hide_label) label.clear().css('display', '');
      else label.hide();
      
      label[opts.insertion_method || 'after'](input.show());

      input
        .size_to_fit()
//        .autocomplete(opts.autocomplete)
        .one('blur', function(e) {
          opts.commit && opts.commit.call(this, opts);
          
          function triggerCommit() {
            label.parent_node().trigger('commit', label);
            _this.tree().trigger('commit_'+label.attr('class'), opts);
          }
          
          if(opts.complete) {        
            _(document.body).append(input.hide());
            opts.complete();
            triggerCommit();
          }
          else {
            _(document.body).append(input.hide());
            if(opts.default_value) {
              label
                .html(input.val() || opts.default_value)
                .show();
              triggerCommit();
            }
            else if(opts.hide_if_empty) {      
              label
                .html(input.val())
                .hide_if_empty();
              triggerCommit();
            }
            else if(opts.remove_if_empty) {
              label
                .html(input.val());
              triggerCommit();
              label.remove_if_empty();
            }
            else if(opts.if_empty) {
              label
                .show()
                .html(input.val());
              triggerCommit();
              label.if_empty(opts.if_empty);
            }
            else {
              label.html(input.val());
              triggerCommit();
            }
          }
        });
      
      label.parent().length && opts.success && opts.success.call(label);
      
      setTimeout(function(){input.focus();}, 1);
      return this;
    }
  })
  
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/code_node/code_node.js');
;(function(_) {
  _.tree.code_node.fn({
    edit: function() {
    }
    
    ,paint: function(data) {
      var _this = _(this)
    }
  });
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/haml_serializer/haml_serializer.js');
;(function(_) {
  _.fn.extend({
    serialize_children_to_haml: function(indent) {
      if(indent === undefined) indent = '';
      else indent += '  ';
      return this
        .children()
          .map(function(){
            return _(this).fn('to_haml', indent);
          })
            .join('');
    }
  });
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/json_marshal/json_marshal.js');
;(function(_) {
  _.tree.init_json_marshal_plugin = function(tree, options) {
  
  };
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/plugins/autocomplete/autocomplete.js');
;(function(_) {
  _.tree.init_autocomplete_plugin = function(tree, options) {
  
  };
})(jQuery);


console.log('/home/collin/code/jquery_tree/lib/tree.js');
;(function(_){
  _.tree.tree_node.fn({
    edit: function() {
      var _this = _(this);
      _this.label().fn('edit');
      return _this;
    }

    ,paint: function(label) {
      return _(this).label().html(label);
    }
    
    ,to_haml: function(indent) {
      var _this = _(this);
      return indent
        + _this.label().text()
        + "\n"
        + _this
            .child_list()
              .serialize_children_to_haml(indent);
    }
  });

  function defaults() {
    return {
      node: {
        basic: _.tree.tree_node.deep_clone(true)
      }
      ,plugins: ''
    };
  }

  var inspection_class = 'inspected'
    ,inspection_event = 'inspection';

  _.fn.extend({
    init_tree_plugins: function(plugins, options) {
      var tree = this;
      _(plugins).each(function() {
        _.tree['init_'+this+'_plugin'].call(tree, tree, options);
      });
      return this;
    }

    ,label: function() {
      return this.children('span:first');
    }

    ,swap_node_type: function(type) {
      var new_node = this.tree().data('tree.options').node[type].deep_clone(true);
      new_node
        .child_list()
          .replace(this.child_list());
          
      this.replace(new_node);
      new_node
        .fn('paint')
        .fn('edit');
      new_node.find('input')[0].select();
      return new_node;
    }

    ,is_tree: function(options) {
      options = _.extend(defaults(), options);
      options.plugins = options.plugins.split(/ /);

      var tree = this;
      tree
        .data('tree.options', options)
        .init_tree_plugins(options.plugins, options)
        .fn({
          to_haml: function() {
            return _(this).serialize_children_to_haml();
          }
        });
        

      return this
        .click(function(e) {
            e.preventDefault();
            var el = _(e.target)
              ,node = el.parent_node();

            if(el.is('input')) return;
            _(options.plugins).each(function() {
              if(el.hasClass(this))
                if(el[this+'_click'])
                  el[this+'_click'](el, node);
            });
          })
        .mouseover(function(e) {
            var node = _(e.target);
            tree.remove_class_on_all_children_and_self(inspection_class)
            if(!node.is('.tree_node')) node = node.parent_node();
            node.trigger(inspection_event);
            node.addClass(inspection_class);
          });
    }

    ,child_list: function() {
      if(this.is('ol')) return this;
      return this.find('ol:first');
    }

    ,tree: function() {
      if(this.hasClass('tree')) return this;
      return this.parents('.tree:first');
    }

    ,parent_node: function() {
      var node = this.parents('.tree_node:first');
      if(node.length) return node;
      return this.filter('.tree_node');
    }

    // assumes effen
    ,deep_clone: function(events) {
      var clone = this.clone(events)
        .mixin(this)
        .clear();

      this.children().each(function() {
        clone.append(_(this).deep_clone(events));
      });

      return clone;
    }

    ,create_node_after: function(contents) {
      var node = this._create_node(contents);
      this.after(node);
      return node;
    }

    ,create_node: function(contents) {
      var node = this._create_node(contents);
      this
        .removeClass('empty')
        .child_list()
          .append(node);
      return node;
    }

    ,_create_node: function(contents, type) {
      if(!type) type = 'basic'
      var node = this.tree().data('tree.options').node[type].deep_clone(true);
      node.fn('paint', contents);
      return node;
    }
  });
})(jQuery);
