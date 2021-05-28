console.log('[Alessandro] T-Rex Chrome')

const sprites = new Image();
sprites.src ='./Game.png';
const canvas = document.getElementById('game');
const contexto = canvas.getContext('2d');

// void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

const Trex = {  
    spriteX :964,
    spriteY :3,
    largura :47,
    altura :50,
    x :0,
    y :canvas.height - 55,

    desenha(){
        contexto.drawImage(
            sprites, 
            Trex.spriteX, Trex.spriteY,
            Trex.largura,Trex.altura, 
            Trex.x,Trex.y, 
            Trex.largura,Trex.altura, 
            );
    }
}

const chao = {
    spriteX :0,
    spriteY :59,
    largura :1379,
    altura :15,
    x :0,
    y :canvas.height - 15,

    desenha(){
        contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY,
            chao.largura,chao.altura, 
            chao.x,chao.y, 
            chao.largura,chao.altura, 
            );

        contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY,
            chao.largura,chao.altura, 
            chao.x + chao.largura,chao.y, 
            chao.largura,chao.altura, 
            );
    }
}

function loop(){
    
    Trex.desenha();
    chao.desenha();

    requestAnimationFrame(loop);
}
loop();