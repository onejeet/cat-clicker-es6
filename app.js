var model = {
	currentCat:{},
		 cats :[
			{
				name: 'Suji',
				credit:'Ryan Poplin',
				creditURL:'https://www.flickr.com/photos/poplinre/625069434/in/photostream/',
				url:'images/cat-1.jpg',
				clickCount:0
			},
			{
				name: 'Maria',
				credit:'Gabriel Rodríguez',
				creditURL:'https://www.flickr.com/photos/chewie/2290467335',
				url:'images/cat-2.jpg',
				clickCount:0
			},
			{
				name: 'Madona',
				credit:'Jetske',
				creditURL:'https://www.flickr.com/photos/jetske',
				url:'images/cat-3.jpg',
				clickCount:0
			},
			{
				name: 'Sera',
				credit:'Kristina Kuncevich',
				creditURL:'https://www.flickr.com/photos/skorpic_k',
				url:'images/cat-4.jpg',
				clickCount:0
			},
			{
				name: 'Jerry',
				credit:'bartlettbee',
				creditURL:'https://www.flickr.com/photos/88534689@N08/',
				url:'images/cat-5.jpg',
				clickCount:0
			},
			{
				name: 'dolce',
				credit:'karen chappell',
				creditURL:'https://www.flickr.com/photos/kchappell/3745846072/in/photolist-6H1rwY-6NoY9m-9nxvEy-7psERF-6rMwHJ-5TfavT-KphbuU-nKZ7kd-4tFWUi-8DGjAj-kenqf-nYRKSN-21WtJuP-8kLDUX-cK2sHW-7b7g4t-tquESq-8wEF4A-aDVskj-igbsz-jGJbyy-6Npp2u-9vhJHV-7yQy5y-6Dscxq-8onxGy-jAKxFf-B4Nusa-XmNci-8JKbX5-8huo5z-e35WLo-dBjUMy-dGg4Mk-4ESoZE-LibLXE-bEtvjy-pVV1HX-8EPakb-EXbbzs-cNL7VY-TRUmXr-ix6iYN-2imWNX-qajCfE-GXZUiK-NDe4F-25F6rJL-agQmCZ-WHsssW',
				url:'images/cat-6.jpg',
				clickCount:0
			}
		]
}





/*
 *------------------
 *	version 2 Script
 *------------------
 */
var catsContainer = $('.cats');

var view = {
	init: function(cat){
		view.displayCatList();
		view.adminFormHide();
		octopus.nameClick(cat);
	},
	emptyCatsContainer:function(){
			catsContainer.html(' ');
	},
	clearCatList:function(){
		$('.catList>ul').html(' ');
	},
	displayCatList:function(){
			model.cats.forEach(function(myCat,id){
				let nameListCont = $('.catList>ul');
				let el = $('<li>'+myCat.name+'</li>');
				nameListCont.append(el);
				octopus.bindEvents(myCat,el);
			});

	},
	displayCatImage: function(cat){
			view.emptyCatsContainer();
			catsContainer.append('<div class="cat"><p class="catName">'+cat.name+'</p><img src="'+
			cat.url+'" class="catImg" alt="cat Image" draggable="false"/><p class="credits"> Image Credit: <a href="'+cat.creditURL+'">'+cat.credit+'</a></p><p class="counterBlock">Meow: <span class="count">'+cat.clickCount+'</span> times</p></div>');
			octopus.assignFormValues(cat);
		},
	renderClickCount: function(cat){
			catsContainer.find('.count').html(cat.clickCount);
	},
	adminFormDisplay:function(){
			$('.adminForm').css('visibility','visible');
	},
	adminFormHide:function(){
			$('.adminForm').css('visibility','hidden');
	}

};

var octopus = {
	init: function(){
		model.currentCat=model.cats[0];
		view.init(model.currentCat);
		octopus.restart();
		octopus.adminForm();
	},
	bindEvents: function(cat,el){
			el.click((function(){
				return function(){
						octopus.nameClick(cat);
				};
			})(cat));
	},
	nameClick: function(cat){
		model.currentCat = cat;
		view.displayCatImage(cat);
		$('.catImg').click(octopus.catClick(cat));
		$('#submit').click(octopus.bindFormEvents());
	},
	catClick: function(cat){
		return function(){
					cat.clickCount += 1;
					view.renderClickCount(cat);
				};
	},
	restart:function(){
		let restartButton = $('.restart');
		restartButton.click(function(){
			model.cats.forEach(cat => cat.clickCount = 0);
			octopus.nameClick(model.cats[0]);
		});

	},
	adminForm:function(){
		$('#admin').click(function(){
				view.adminFormDisplay();
			});
			$('#cancel').click(function(e){
				e.preventDefault();
				view.adminFormHide();
			});
	},
	bindFormEvents: function(){
					return function(e){
						e.preventDefault();
						let cat = model.currentCat;
						octopus.captureFormValues(cat);
						octopus.nameClick(cat);
					};
	},
	captureFormValues:function(cat){
			let catName = $('#catName');
			let catURL = $('#catURL');
			let catClicks = $('#catClicks');
			if(catName.val().trim()!==''){
				cat.name=catName.val();
				view.clearCatList();
				view.displayCatList();
			}
			if(catURL.val().trim()!==''){
				cat.url=catURL.val();

			}
			if(catClicks.val().trim()!==''){
				cat.clickCount = parseInt(catClicks.val());

			}
	},
	assignFormValues:function(cat){
			let catName = $('#catName');
			let catURL = $('#catURL');
			let catClicks = $('#catClicks');
			catName.val(cat.name);
			catURL.val(cat.url);
			catClicks.val(cat.clickCount);
	}
};


octopus.init();


