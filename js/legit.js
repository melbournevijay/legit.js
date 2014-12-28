function _(selector){
	var self = {};
	self.selector = selector;
	if(typeof selector === 'object'){
		self.element = self.selector
	} else{
		var allElements = document.querySelectorAll(self.selector);
		if(allElements.length == 1) {self.element = document.querySelector(self.selector);
		} else { self.elements = allElements; }
	}
/* BASIC FUNCTIONS */
	self.html = function(){ //grab the html of an element mz('selector').html()
		return self.elements || self.element;
	}
	self.attr = function(name,value){ //get and set attribute values
		if(!value) { return self.element.getAttribute(name);
		} else if(self.elements){
			for (var i=0; i < self.elements.length; i++){
				self.elements[i].setAttribute(name,value);
			}
		} else{
			self.element.setAttribute(name,value);
		} return self;
	}
	self.text = function(value){ //get the textContent of an element mz('selector').text()	
		if(!value) return self.element.textContent;
		else if(self.elements){
			for (var i=0; i < self.elements.length; i++){
				self.elements[i].textContent = value;
			}
		}
		else {
			self.element.textContent = value;
		} return self;
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
		if(self.elements){
			for (var i=0; i < self.elements.length; i++){
				self.elements[i].style.display = 'none';
			}
		} else {
			self.element.style.display = 'none';
		} return self;
	}
	self.show = function(){ //show an element
		if(self.elements){
			for (var i=0; i < self.elements.length; i++){
				self.elements[i].style.display = '';
			}
		} else {
			self.element.style.display = '';
		} return self;
	}
	self.after = function(htmlString){ //insert after a parent element
		self.element.insertAdjacentHTML('afterend', htmlString);
		return self;
	}
	self.replaceWith = function(htmlString){ //insert after a parent element
		self.element.outerHTML = htmlString;
		return self;
	}
	self.before = function(htmlString){ //insert before a parent element
		self.element.insertAdjacentHTML('beforebegin', htmlString);
		return self;
	}
	self.height = function(){ //get the height of an element
		return self.element.offsetHeight;
	}
	self.width = function(){ //get the width
		return self.element.offsetWidth;
	}
	self.first = function(){
		if(self.elements) {self.element = self.elements[0];}
		return self;
	}
	self.parent = function(){ //get parent element
		self.element = self.element.parentNode;
		return self;
	}
	self.children = function(key){ //get children elements
		if(!key) key = 0;
		self.element = self.element.childNodes[key];
		return self;
	}
/* Event FUNCTIONS */
	self.on = function(type,callback){
		if(self.elements){
			for (var i=0; i < self.elements.length; i++){
				self.elements[i]['on' + type] = callback;
			}
		}
		else self.element['on' + type] = callback;
		return self;
	}
/* CSS and Class Related FUNCTIONS */
	self.insertRule = function(name,value,position,stylesheet){ //add a CSS rule directly to the stylesheet
		if(!stylesheet) stylesheet = 0;
		if(!position) position = 0;
		if(document.styleSheets[stylesheet]){
			document.styleSheets[stylesheet].insertRule(self.selector + '{'+ name + ': ' + value + '}',position);
		} else if(document.styleSheets[0]){ //if that one doesn't exist, check if there are any stylesheets at all
			console.warn("the specified stylesheet doesn't exist, the first was used instead");
			document.styleSheets[0].insertRule(self.selector + '{'+ name + ': ' + value + '}',position);
		} else console.error('No style sheets available to modify'); //if none are available, give error
		return self;
	}
	self.css = function(name,value){ //add css rule inline
		if(self.elements){
			for (var i=0; i < self.elements.length; i++){
				self.elements[i].style[name] = value;
			}
		} else{
			if(!value) return self.element.style[name];
			self.element.style[name] = value;
		} return self;
	}
	self.class = function(className){ 		//if no class set, return the current class
	  	if(!className) return self.element.getAttribute('class');
		else if(self.elements){
			for (var i=0; i < self.elements.length; i++){
				self.elements[i].className += ' ' + className;
			}
		} else{
			self.element.className += ' ' + className;		
		} return self;
	}
	self.removeClass = function(className){
		if(self.elements){
			for (var i=0; i < self.elements.length; i++){
				var otherClasses = self.elements[i].className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
				self.elements[i].setAttribute('class', otherClasses);
			}
		}
		else{
			var otherClasses = self.element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
			self.element.setAttribute('class', otherClasses);
		} return self;
	}
	self.toggleClass = function(className){ //toggle a class
		if (self.element.classList) { 
			self.element.classList.toggle(className);
		} else {
			var classes = self.element.className.split(' ');
			var existingIndex = classes.indexOf(className);
			if (existingIndex >= 0) {
				classes.splice(existingIndex, 1);
			} else { classes.push(className);
				self.element.className = classes.join(' ');
			}
		} return self;
	}
	return self; // so that you may chain functions
}