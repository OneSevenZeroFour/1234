require(['config'],function(){
    require(['jquery','socketio'],function($,io){
        $('.kfwindow').load('../index.html #customerService');
            
        require(['kf_module']);
        
    });
});