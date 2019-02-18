var options = {
    mapTypeControlOptions: {
        // mapTypeIds: ['Styled']
    },
    disableDefaultUI: true,
    center: new google.maps.LatLng(55.842300577066744,37.372519294967645),
    zoom: 16,
    scrollwheel: false,
    draggable: true,
};

map = new google.maps.Map(document.getElementById("map"), options);

var myLatlng = new google.maps.LatLng(55.842300577066744,37.372519294967645);

var markerImage = new google.maps.MarkerImage(
    '/images/mark.png',
    new google.maps.Size(42, 57),
    new google.maps.Point(0, 0),
    new google.maps.Point(21, 57)
);

var marker = new google.maps.Marker({
    icon: markerImage,
    position: myLatlng,
    map: map,
    title: 'Москва, ул. Митинская, 16, Бизнес центр «YES»'
});

var contentString = 'Москва, ул. Митинская, 16, Бизнес центр «YES»';

var infowindow = new google.maps.InfoWindow({
    content: contentString
});

marker.addListener('click', function() {
    infowindow.open(map, marker);
});

//
