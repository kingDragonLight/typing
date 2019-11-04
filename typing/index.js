const width=document.body.clientWidth;
const height=document.body.clientHeight;
console.log(width,height)

const simply=document.getElementById('simply');
const normal=document.getElementById('normal');
const hard=document.getElementById('hard');
let speed=1,time=1000
simply.addEventListener('click',function(){
    speed=1
})
normal.addEventListener('click',function(){
    speed=2
})
hard.addEventListener('click',function(){
    speed=4
})



const app = new PIXI.Application({
    width:width,
    height:height,
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: window.devicePixelRatio || 1       
});
const   Application = PIXI.Application,
        loader = PIXI.loader,
        Container = PIXI.Container,
        resources = PIXI.loader.resources;
document.body.appendChild(app.view);

let appleContainer
const letterArray=[
    'a.png','b.png','c.png','d.png','e.png','f.png','g.png','h.png','i.png','j.png','k.png','l.png','m.png','n.png',
    'o.png','p.png','q.png','r.png','s.png','t.png','u.png','v.png','w.png','x.png','y.png','z.png'
]
const resuorce=[
    'back.jpg'
].concat(letterArray)

loader.add(resuorce).load(pixiLoad);
const loading=document.getElementById('loading')
function pixiLoad(){
    appleContainer=new Container()
    const gameBack=new Container();
    const backImg=getSprite('back.jpg')
    backImg.width=width;
    backImg.height=height;
    gameBack.addChild(backImg)
    app.stage.addChild(gameBack)
    app.stage.addChild(appleContainer)
    loading.style.display='none'
    // addApple()
    // animate()
}
let generatorApple
const start=document.getElementById('start')
const home=document.getElementById('home')
start.addEventListener('click',function(){
    addApple()
    animate()
    home.style.display='none'
    generatorApple=setInterval(()=>{
            addApple()
            console.log(time)
    },time)
})
function addApple(){
    const index=Math.floor(Math.random()*letterArray.length);
    const url=letterArray[index]
    console.log(url)
    const apple=getSprite(url)
    let x=Math.random()*width;
    apple.width=180;
    apple.height=202;
    apple.y=0;
    apple.x=x>width-180?width-180:x;
    appleContainer.addChild(apple)
    console.log(appleContainer.children[0]._texture.textureCacheIds)
    console.log(appleContainer.children)
}

function getSprite(url){
    var sprite=new PIXI.Sprite(PIXI.loader.resources[url].texture);
    return sprite
}
let fraction=0;
const num=document.getElementById('num');

function getFraction(m){
    num.innerHTML=m
}

function animate(){
    const children=appleContainer.children;
    children.forEach((item) => {
        item.y+=speed;
        if(item.y>height){
            alert('游戏失败')
            appleContainer.removeChildren()
            fraction=0;
            getFraction(fraction)
            clearInterval(generatorApple)
            home.style.display='block';
            speed=1
            cancelAnimationFrame(animate)
        }
    });
    requestAnimationFrame(animate)
}

document.onkeydown=function(event){
    var e = event || window.event
    const key=e.key
    removeChild(key)
}; 

function removeChild(key){
    const children=appleContainer.children;

    children.forEach((item,index)=>{
        // console.log(item._texture.textureCacheIds[0].substring(0,1))
        if(item._texture.textureCacheIds[0].substring(0,1)==key){
            appleContainer.removeChildAt(index)
            fraction=fraction+1;
            getFraction(fraction)
            return
        }
    })
}

