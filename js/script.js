var app = {};
app.main = function(){
    $('.sticky').Stickyfill();
    $(window).scroll(app.scrollAction);
    $('a[href^="#"]').on('click',app.smothScroll);
    ld.sectionOne();
};
app.scrollAction = function(){
    if($(this).scrollTop()>50){ 
        $('.header').addClass('header-minifier');
        $('.header > .logo').addClass('hide');
    }
    else{
        $('.header').removeClass('header-minifier');
        $('.header > .logo').removeClass('hide');
    }
}
app.smothScroll = function(e){
    e.preventDefault();
    var target = this.hash;
    console.log(target);
    var $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top - 100
    }, 300, 'swing', function () {
        window.location.hash = target;
    });
}

var interactiveObject = {};
interactiveObject.leftPositionSetter = function(dom,newPosition){
    if(newPosition != null){
        dom.css({
            left:newPosition
        });
    }
    return dom.position().left;
}
interactiveObject.topPositionSetter = function(dom,newPosition){
    if(newPosition != null){
        dom.css({
            top:newPosition
        });
    }
    return dom.position().top;
}

var mascot = {};
mascot.selector = "#mascot";
mascot.show = function(){
    $(mascot.selector).show();
}
mascot.hide = function(){
    $(mascot.selector).hide();
}
mascot.resize = function(newHeight){
    $(mascot.selector).css({
        height:newHeight
    });
}
mascot.leftPosition = function(newPosition = null){
    return interactiveObject.leftPositionSetter($(mascot.selector), newPosition);
}
mascot.topPosition = function(newPosition = null){
    return interactiveObject.topPositionSetter($(mascot.selector), newPosition);
}

var conversation = {};
conversation.selector = "#text-bubble";
conversation.changeText = function(newText){
    $(conversation.selector).html(newText);
}
conversation.leftPosition = function(newPosition = null){
    return interactiveObject.leftPositionSetter($(conversation.selector), newPosition);
}
conversation.topPosition = function(newPosition = null){
    return interactiveObject.topPositionSetter($(conversation.selector), newPosition);
}

var laptop = {};
laptop.selector = ".laptop";
laptop.hide = function(){
    $(laptop.selector).hide();
}
laptop.show = function(){
    $(laptop.selector).show();
}
laptop.leftPosition = function(newPosition = null){
    return interactiveObject.leftPositionSetter($(laptop.selector), newPosition);
}
laptop.topPosition = function(newPosition = null){
    return interactiveObject.topPositionSetter($(laptop.selector), newPosition);
}

var button = {};
button.selector = ".action-button";
button.setText = function(newText){
    $(button.selector).text(newText);
}
button.leftPosition = function(newPosition = null){
    return interactiveObject.leftPositionSetter($(button.selector), newPosition);
}
button.topPosition = function(newPosition = null){
    return interactiveObject.topPositionSetter($(button.selector), newPosition);
}

var codeViewer = {};
codeViewer.selector = ".screen pre code";
codeViewer.highlight = function(){
    $(codeViewer.selector).each(function(i, block) {
    hljs.highlightBlock(block);
  });
}
codeViewer.codeSet = function(newCode){
    $(codeViewer.selector).html(newCode);
}
codeViewer.fontSize = function(newSize){
    $(codeViewer.selector).css({fontSize:newSize});
}

var dataAppender = {};
dataAppender.hideCheck = function(selector,bool){
    if(bool){
        $(selector).hide();
    }
    else{
        $(selector).show();
    }
}
dataAppender.setData = function(data){ 
    $('#tag-title').html('&lt;'+data.title+'&gt;');
    
    mascot.leftPosition(data.mascot.left);
    mascot.topPosition(data.mascot.top);
    dataAppender.hideCheck(mascot.selector,data.mascot.hide);
    
    laptop.leftPosition(data.code.left);
    laptop.topPosition(data.code.top);
    dataAppender.hideCheck(laptop.selector,data.code.hide);
    
    conversation.leftPosition(data.bubble.left);
    conversation.topPosition(data.bubble.top);
    conversation.changeText(data.bubble.text[0]);
    dataAppender.hideCheck(conversation.selector,data.bubble.hide);
    
    button.leftPosition(data.button.left);
    button.topPosition(data.button.top);
    button.setText(data.button.text);
    dataAppender.hideCheck(button.selector,data.button.hide);
    
    codeViewer.codeSet(data.code.content);
    codeViewer.highlight();
    
}
var ld = {};
/*** Giriş ***/
ld.sectionOne = function(){
    li = new dataInterpreter;
    var data = li.getData(0);
    dataAppender.setData(data);
    codeViewer.fontSize(20);
    $(button.selector).bind('click',function(){
        ld.sectionTwo();
    });
}
ld.sectionTwo = function(){
    li = new dataInterpreter;
    var data = li.getData(1);
    $(button.selector).unbind('click');
    dataAppender.setData(data);
    $(button.selector).bind('click',function(){
        conversation.changeText(data.bubble.text[1]);
        codeViewer.codeSet('                &lt;html&gt;\r\n\n   ...\n\n                &lt;\/html&gt;');
        codeViewer.fontSize(30);
        codeViewer.highlight();
        button.setText('Head Etiketi >')
        $(button.selector).unbind('click');
        $(button.selector).bind('click',function(){
            ld.sectionThree();
        });
    });
}
ld.sectionThree = function(){
    li = new dataInterpreter;
    var data = li.getData(2);
    $(button.selector).unbind('click');
    dataAppender.setData(data);
    $(button.selector).bind('click',function(){
        codeViewer.codeSet('&lt;head&gt;\r\n         &lt;title&gt;Sayfa başlığı&lt;\/title&gt;\n&lt;\/head&gt;\r<img width = "400px" src = "images/title.png"/>');
        codeViewer.fontSize(20);
        codeViewer.highlight();
        conversation.changeText(data.bubble.text[1]);
        button.setText('Title Etiketi >');
        $(button.selector).bind('click',function(){
            ld.sectionFour();
        });
    });
}
ld.sectionFour = function(){
    li = new dataInterpreter;
    var data = li.getData(3);
    $(button.selector).unbind('click');
    dataAppender.setData(data);
    codeViewer.fontSize(20);
    $(button.selector).bind('click',function(){
        conversation.changeText(data.bubble.text[1]);
        button.setText('Body Etiketi >');
        $(button.selector).bind('click',function(){
            ld.sectionFive();
        });
    });
}
ld.sectionFive = function(){
    li = new dataInterpreter;
    var data = li.getData(4);
    $(button.selector).unbind('click');
    dataAppender.setData(data);
    codeViewer.fontSize(20);
    $(button.selector).bind('click',function(){
        conversation.changeText(data.bubble.text[1]);
        button.setText('Başlık Etiketleri > >');
        $(button.selector).bind('click',function(){
            ld.sectionSix();
        });
    });
}
ld.sectionSix = function(){
    li = new dataInterpreter;
    var data = li.getData(5);
    $(button.selector).unbind('click');
    codeViewer.fontSize(18);
    dataAppender.setData(data);
    $(button.selector).bind('click',function(){
        conversation.changeText(data.bubble.text[1]);
        button.setText('Paragraf Etiketi > >');
        $(button.selector).bind('click',function(){
            ld.sectionSeven();
        });
    });
}
ld.sectionSeven = function(){
    li = new dataInterpreter;
    var data = li.getData(6);
    $(button.selector).unbind('click');
    codeViewer.fontSize(22);
    dataAppender.setData(data);
    $(button.selector).bind('click',function(){
        conversation.changeText(data.bubble.text[1]);
        button.setText('<br> Etiketi > >');
        $(button.selector).bind('click',function(){
            ld.sectionEight();
        });
    });
}
ld.sectionEight = function(){
    li = new dataInterpreter;
    var data = li.getData(7);
    $(button.selector).unbind('click');
    codeViewer.fontSize(17);
    dataAppender.setData(data);
    $(button.selector).bind('click',function(){
        conversation.changeText(data.bubble.text[1]);
        button.setText('Center Etiketi > >');
        $(button.selector).bind('click',function(){
            ld.sectionNine();
        });
    });
}
ld.sectionNine = function(){
    li = new dataInterpreter;
    var data = li.getData(8);
    $(button.selector).unbind('click');
    codeViewer.fontSize(17);
    dataAppender.setData(data);
    $(button.selector).bind('click',function(){
        conversation.changeText(data.bubble.text[1]);
        button.setText('hr Etiketi > >');
        $(button.selector).bind('click',function(){
            ld.sectionTen();
        });
    });
}
ld.sectionTen = function(){
    li = new dataInterpreter;
    var data = li.getData(9);
    $(button.selector).unbind('click');
    codeViewer.fontSize(16);
    dataAppender.setData(data);
    $(button.selector).bind('click',function(){
        conversation.changeText(data.bubble.text[1]);
        button.setText('b Etiketi > >');
        $(button.selector).bind('click',function(){
           ld.sectionEleven();
        });
    });
}
ld.sectionEleven = function(){
    li = new dataInterpreter;
    var data = li.getData(10);
    $(button.selector).unbind('click');
    codeViewer.fontSize(24);
    dataAppender.setData(data);
    conversation.changeText(data.bubble.text[1]);
        button.setText('i Etiketi > >');
    $(button.selector).bind('click',function(){
        ld.sectionTwelve();
    });
}
ld.sectionTwelve = function(){
    li = new dataInterpreter;
    var data = li.getData(11);
    $(button.selector).unbind('click');
    codeViewer.fontSize(24);
    dataAppender.setData(data);
    conversation.changeText(data.bubble.text[1]);
    button.setText('baglantı Etiketi > >');
    $(button.selector).bind('click',function(){
    ld.sectionThirteen();
    });
}
ld.sectionThirteen = function(){
    li = new dataInterpreter;
    var data = li.getData(12);
    $(button.selector).unbind('click');
    codeViewer.fontSize(20);
    dataAppender.setData(data);
    conversation.changeText(data.bubble.text[1]);
    button.setText('img Etiketi > >');
    $(button.selector).bind('click',function(){
    ld.sectionFourteen();
    });
}



$(document).ready(app.main);
