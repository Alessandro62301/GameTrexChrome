console.log('[Alessandro] T-Rex Chrome')

const sprites = new Image();
sprites.src ='./Game.png';
const canvas = document.getElementById('game');
const contexto = canvas.getContext('2d');

//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
function colisao(Trex,chao){
 const trexY = (Trex.y + Trex.altura) ;
 const chaoY = chao.y;

 if(trexY  <= chaoY){
     return true;
 }
     return false;
 
}
function verificarAltura(Trex,canvas){

    

    if(Trex.y > canvas.height -60){
        return true;
    }
  
    return;
}
const Trex = {  
    spriteX :964,
    spriteY :3,
    largura :47,
    altura :50,
    x :0,
    y :canvas.height - 64,
    pulo : 7,
    velocidadeAndar :0.05 ,
    velocidade : 10,
    aceleracao : 0.01,
    gravidade : 0.25,


    desenha(){
        contexto.drawImage(
            sprites, 
            Trex.spriteX, Trex.spriteY,
            Trex.largura,Trex.altura, 
            Trex.x,Trex.y, 
            Trex.largura,Trex.altura, 
            );
    },
    atualiza(){
        Trex.velocidadeAndar = Trex.velocidadeAndar  + Trex.aceleracao;
        Trex.x = Trex.x + Trex.velocidadeAndar;
    },
    atualizaQueda(){
        if(verificarAltura(Trex,canvas) == true){
            console.log(Trex.y);

            return;
        }
        
        Trex.velocidade = Trex.velocidade  + Trex.gravidade;
        Trex.y = Trex.y + Trex.velocidade;
        

        
        
    },
    pula(){
        Trex.y = Trex.y - Trex.pulo;
        Trex.velocidade = - Trex.pulo;  

    }, 
}
const planoFundo = {
     desenha(){
         contexto.fillStyle = '#fff';
         contexto.fillRect(0,0,canvas.width,canvas.height);
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
const passaro =  {
    spriteX :204,
    spriteY :3,
    largura :49,
    altura :31,
    x :100,
    y :350,

    desenha(){
        contexto.drawImage(
            sprites, 
            passaro.spriteX, passaro.spriteY,
            passaro.largura,passaro.altura, 
            passaro.x,passaro.y, 
            passaro.largura,passaro.altura, 
            );
        }
}
const cacto = {
    spriteX :375,
    spriteY :2,
    largura :27,
    altura :56,
    x :400,
    y :canvas.height - 56,

    desenha(){
        contexto.drawImage(
            sprites, 
            cacto.spriteX, cacto.spriteY,
            cacto.largura,cacto.altura, 
            cacto.x,cacto.y, 
            cacto.largura,cacto.altura, 
            );
        }
}
const mensagemComecar = {
    spriteX :43,
    spriteY :4,
    largura :52,
    altura :51,
    x :0,
    y :canvas.height - 55,

    desenha(){
        contexto.drawImage(
            sprites, 
            mensagemComecar.spriteX, mensagemComecar.spriteY,
            mensagemComecar.largura,mensagemComecar.altura, 
            mensagemComecar.x,mensagemComecar.y, 
            mensagemComecar.largura,mensagemComecar.altura, 
            );
        }
};


//
//  [telas]
//
let telaAtiva = {};
function mudaTela(novaTela){
    telaAtiva = novaTela;
}
const telas = { 

    INICIO : { 
         desenha(){
            mensagemComecar.desenha();
         },
         atualiza(){

         },
         keydown(){
             mudaTela(telas.JOGO);
         }
    },

    JOGO : {
        desenha(){
            planoFundo.desenha();
            chao.desenha();
            cacto.desenha();
            passaro.desenha();
            Trex.desenha();
        },
        keydown(){
            if(Trex.y == 446.25){
                Trex.pula();           
            }
        
        },
        atualiza(){
          Trex.atualiza();
          Trex.atualizaQueda();
        }
    },

};





function loop(){

    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    requestAnimationFrame(loop);
}
window.addEventListener('keydown' ,function(){
    if(telaAtiva.keydown){
        telaAtiva.keydown();
    }
});
window.addEventListener('keydown' ,function(evento){
    console.log(evento.key);
    if(evento.key === 32){
        if(telaAtiva.keydown){
            telaAtiva.keydown();
        }
    }
});
mudaTela(telas.INICIO);
loop();
