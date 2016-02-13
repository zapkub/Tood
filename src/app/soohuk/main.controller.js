import * as Actions from './actions';


export class MainController {
  constructor($interval,$timeout,bgImage, createStore, chance,$ngRedux,$scope,TweenMax,$http) {
    'ngInject';
    this.chance = chance;
    this.http = $http;
    this.timeout = $timeout;
    this.bgImageThumbnail = bgImage;
    const unsubscribe = $ngRedux.connect(this.State,Actions)(this);
    $scope.$on('$destroy', unsubscribe);
    this.interval = $interval;
  }
  rolling(){
    this.isStop = false;
    if(!this.rollingInterval)
    this.rollingInterval = this.interval(()=>{
      this.random();
    },10);

  }
  stopRolling(){
    this.isStop = true;
    if(this.rollingInterval){
      this.interval.cancel(this.rollingInterval);
      this.rollingInterval = null;
    }
  }

  State(state){
    return {
      value:state
    }
  }

  share(){
    if(!this.value.random){
      alert('กดปุ่มสีเหลืองเพิ่มเริ่มตามหาก่อน')
    }
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 315;
    //วาด
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.drawImage(this.bgImageThumbnail,0,0,this.bgImageThumbnail.width/2,this.bgImageThumbnail.height/2);

    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.font = "normal 48px ds-digitalbold";

    let textLength = ctx.measureText(this.value.random.format('D[.]M[.]YYYY'));
    let textPositionX = canvas.width/2 - textLength.width/2;
    ctx.fillText(this.value.random.format('D[.]M[.]YYYY'),textPositionX,35 + canvas.height/2);

    // let imageTitle = document.getElementById('title');
    // ctx.drawImage(imageTitle,10,10,imageTitle.width*0.4,imageTitle.height*0.4);

    // ctx.textBaseline = "bottom";
    // ctx.font = "normal 12px thaisans_neueregular";
    // let hashText = "#GASOHUG #แก๊สโซฮักรักเต็มถัง"
    // textLength = ctx.measureText(hashText);
    // textPositionX = canvas.width/2 - textLength.width/2;
    // ctx.fillText(hashText,textPositionX,canvas.height);


    let data = canvas.toDataURL('image/jpeg', 0.8);
    let encodedjpg = data.substring(data.indexOf(',') + 1, data.length);

    // document.body.appendChild(canvas);
    // return;
    this.isLoaded = true;
    this.http({
        method: "post",
        url: "http://gth.co.th/startheque/writeImage.php",
        data: {filename: 'sohak_', image: encodedjpg},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success( (res)=> {
                console.log('ขี้เกียจย้ายใส่รวมไว้กับ startreque ละกัน')
                 console.log('http://gth.co.th/startheque/result/' + res.filename + '.jpg');
                this.timeout( ()=> {
                    this.isLoaded = false;
                    FB.ui({
                        method: 'feed',
                        name: 'เนื้อคู่ของคุณจะมาวันที่' + this.value.random.format('D[/]M[/]YYYY'),
                        link: 'https://gth.co.th/startheque',
                        caption: 'แก๊สโซฮักรักเต็มถัง ',
                        description: 'ดีใจด้วยเตรียมรอรับคนในฝันของคุณได้เลย ขอให้เจอคนน่าฮักรักกันแบบเต็มถังนะจ๊ะ\n#GASOHUG #แก๊สโซฮัก',
                        //picture:'http://www.thesecretfarm.com/startrek/result/'+res.filename+'.jpg'
                        picture: 'http://www.gth.co.th/startheque/result/' + res.filename + '.jpg'//'http://www.thesecretfarm.com/creativegift/star_55652e81082027.jpg'//'http://gth.co.th/startheque/result/'+res.filename+'.jpg',//'http://www.thesecretfarm.com/creativegift/star_55652e81082027.jpg'//
                    }, function (response) {
                      console.log(response);
                        if (!response['error_code']) {
                            alert('Share สำเร็จแล้ว!');
                        }
                    });
                }, 1000)
            });
  }
}


export function DigitalMeterDirective(TweenMax){
    'ngInject';
    let directive = {
      restrict:'EA',
      scope:{
        value:'=',
        stop:'=',
        dot:'='
      },
      transclude: true,
      template:'<span>{{animationValue.value + ((dot) ? ".":"")}}</span>',
      link:(scope,elem,attr)=>{
        scope.animationValue = {value:"-"};
        scope.$watch('value',(newVal)=>{
          if(newVal)
            scope.animationValue = {value:newVal};
        });
        scope.$watch('stop',()=>{
          if(scope.stop){
            let value = scope.animationValue.value;
            scope.animationValue.value = 0;
            TweenMax.to(scope.animationValue,0.3,{value:value,onUpdate:()=>{
              scope.animationValue.value = Math.ceil(scope.animationValue.value)
              scope.$apply();
            },ease:Circ.easeOut});
          }
        })
      }
    }

    return directive;
}
