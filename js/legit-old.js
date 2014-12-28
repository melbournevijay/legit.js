function _(selector){
	var self = {};
	self.selector = selector;
	if(typeof selector === 'object'){
		self.element = self.selector
	}
	else self.element = document.querySelector(self.selector);

	/* BASIC FUNCTIONS */

	//get the innerhtml of an element mz('selector').html()
	self.html = function(value){
		if(!value) return self.element;

		self.element.innerHTML = value;
		return self;
	}
	//get and set attribute values
	self.attr = function(name,value){
		//if no value set, return the current value
		if(!value) return self.element.getAttribute(name);

		self.element.setAttribute(name,value);
		return self;
	}
	//get the height of an element
	self.height = function(){
		return self.element.offsetHeight;
	}
	//get the width
	self.width = function(){
		return self.element.offsetWidth;
	}
	//get parent element
	self.parent = function(){
		self.element = self.element.parentNode;
		return self;
	}
	//get children elements - use .children(1) to specify which child
	self.children = function(key){
		if(!key) key = 0;
		self.element = self.element.childNodes[key];
		return self;
	}
	

	/* Event FUNCTIONS */

	self.on = function(type,callback){
		self.element['on' + type] = callback;
		return self;
	}

	/* CSS Related FUNCTIONS */

	//add a CSS rule directly to the stylesheet
	self.insertRule = function(name,value,position,stylesheet){
		if(!stylesheet) stylesheet = 0;
		if(!position) position = 0;
		//check for the specified style sheet
		if(document.styleSheets[stylesheet]){
			document.styleSheets[stylesheet].insertRule(self.selector + '{'+ name + ': ' + value + '}',position);
		}

		//if that one doesn't exist, check if there are any stylesheets at all
		else if(document.styleSheets[0]){
			//warn them
			console.warn("the specified stylesheet doesn't exist, the first was used instead");
			document.styleSheets[0].insertRule(self.selector + '{'+ name + ': ' + value + '}',position);
		}
		//if none are available, give error
		else console.error('No style sheets available to modify');

		return self;
	}
	//add css rule inline
	self.css = function(name,value){
		//if no value set, return the current value
		if(!value) return self.element.style[name];

		self.element.style[name] = value;
		return self;
	}


  /* Additional function thanks to http://youmightnotneedjquery.com/ */
  self.text = function(value){ //get the textContent of an element mz('selector').text()	
		if(!value) return self.element.textContent;
		self.element.textContent = value;
		return self;
	}
	self.hasClass = function(className){ //check if element has class
		if (self.element.classList) self.element.classList.contains(className);
		else new RegExp('(^| )' + className + '( |$)', 'gi').test(self.element.className);
    return self;
	}
  self.addClass = function(className){ //add a class
		if (self.element.classList) self.element.classList.add(className);
		else self.element.className += ' ' + className;
    return self;
	}
  self.removeClass = function(className){ //remove a class
		if (self.element.classList) self.element.classList.remove(className);
		else self.element.className = self.element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    return self;
	}
	self.toggleClass = function(className){ //toggle a class
		if (self.element.classList) { self.element.classList.toggle(className);
		} else {
		  var classes = self.element.className.split(' ');
		  var existingIndex = classes.indexOf(className);
		  if (existingIndex >= 0) classes.splice(existingIndex, 1);
		  else classes.push(className);
       self.element.className = classes.join(' ');
		}
    return self;
	}
	self.next = function(){ //get next element
		self.element = self.element.nextElementSibling;
		return self;
	}
	self.prev = function(){ //get previous element
		self.element = self.element.previousElementSibling;
		return self;
	}
	self.hide = function(){ //hide an element
		self.element.style.display = 'none';
		return self;
	}
	self.show = function(){ //show an element
		self.element.style.display = '';
		return self;
	}
	self.fadeIn = function(element){ //fadein an element
    self.element.style.opacity = 0;
    var last = +new Date();
	  var tick = function() {
	    self.element.style.opacity = +self.element.style.opacity + (new Date() - last) / 400;
	    last = +new Date();
	    if (+self.element.style.opacity < 1) { (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16) }
	  };
	  tick();
		return self;  
	}
	self.after = function(htmlString){ //insert after a parent element
		self.element.insertAdjacentHTML('afterend', htmlString);
		return self;
	}
	self.before = function(htmlString){ //insert before a parent element
		self.element.insertAdjacentHTML('beforebegin', htmlString);
		return self;
	}
	self.clone = function(){ 
		self.element.cloneNode(true);
		return self;
	}


	return self;
}