// 定位
function position(){
    var geolocation = new BMap.Geolocation(); 
    geolocation.getCurrentPosition(function(r){
    var latitude  = r.latitude*1;//纬度
    var longitude = r.longitude*1;//经度
    var point = new BMap.Point(longitude,latitude);
    var geoc = new BMap.Geocoder();  
    geoc.getLocation(point, function(rs){
     console.log(rs);
     var addComp = rs.addressComponents;
     var name = addComp.province + ", " + addComp.city + ", " + addComp.district;
     console.log(name)
     $('.position').html(name);
    });           
    },{enableHighAccuracy: true});
}