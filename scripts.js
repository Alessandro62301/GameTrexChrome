console.log('[Alessandro] T-Rex Chrome')

const sprites = new Image();
sprites.src ='./Game.png';
const canvas = document.getElementById('game');
const contexto = canvas.getContext('2d');
let frames = 0;

//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
const globais = {};

function criaTrex(){
    const Trex = {  
        spriteX :964,
        spriteY :3,
        largura :47,
        altura :50,
        x :20,
        y :canvas.height - 64,
        pulo : 7,
        velocidadeAndar :0 ,
        velocidade : 10,
        aceleracao : 0,
        gravidade : 0.25,
    
        movimentos :[
            {spriteX :964, spriteY : 3},
            {spriteX :1116 , spriteY : 3},
            {spriteX :1065 , spriteY : 3},
        ],
        framesAtual :0,
        atualizaFrame(){
            const intervaloFrames = 5;
            const passouIntervalo = frames % intervaloFrames === 0 ;
            if(passouIntervalo){
                if(Trex.y > 446){
                    const baseIncremento = 1;
                    const incremento = baseIncremento + Trex.framesAtual;
                    const baseRepeticao = Trex.movimentos.length;
                    Trex.framesAtual = incremento % baseRepeticao;
            }
         
        }},
        desenha(){
            const {spriteX , spriteY } = Trex.movimentos[this.framesAtual];

            this.atualizaFrame();
            contexto.drawImage(
                sprites, 
                spriteX, spriteY,
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
    return Trex;
}
function criaChao(){

    const chao = {
        spriteX :0,
        spriteY :59,
        largura :1379,
        altura :15,
        x :0,
        y :canvas.height - 15,
    
        atualiza(){
            const movimentoChao  = 5;
            const repeteEm = chao.largura/1.2;
            const movimentacao = chao.x - movimentoChao; 
           
            chao.x = movimentacao  % repeteEm;
        },
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



    return chao;
}
function criaCactos(){

    const random = 0;

    const cacto = {
        spriteX :375,
        spriteY :2,
        largura :27,
        altura :56,
        x :800 ,
        y :canvas.height - 56,

        tipos :[
            {spriteX :375, spriteY : 2},
            {spriteX :488 , spriteY : 2},
            {spriteX :335 , spriteY : 2},
        ],
    
        desenha(){
            
            cacto.pares.forEach(function(par){
                const cactoChaoX = par.x;
                const cactoChaoY = canvas.height - 56;
                contexto.drawImage(
                sprites, 
                cacto.spriteX, cacto.spriteY,
                cacto.largura,cacto.altura, 
                cactoChaoX,cactoChaoY, 
                cacto.largura,cacto.altura, 
                );
            }
        )},
            pares : [],

            colisaoCacto(par){

                if(globais.Trex.x >= par.x && globais.Trex.y >= cacto.y){
                    mudaTela(telas.INICIO);
                }
  
                return false;
            },
            
        atualiza(){
            const passou100Frames = frames %150 == 0;
            if(passou100Frames){
                cacto.pares.push({
                    x:canvas.width,
                })
            }
            const passou350Frames = frames %350 == 0;
            if(passou350Frames){
                cacto.pares.push({
                    x:canvas.width -25,
                })
            }
            const passou110Frames = frames %110 == 0;
            if(passou110Frames){
                cacto.pares.push({
                    x:canvas.width + 25,
                })
            }

            cacto.pares.forEach(function(par){
                 par.x = par.x -5;
                 
                if(cacto.colisaoCacto(par) === true){
                    telas.INICIO();
                }

                 if(par.x + cacto.largura <= -50){
                     cacto.pares.shift();
                 }
            });
       
      }
    }
    return cacto;
}
function criaPassaro(){
    const passaro =  {
        spriteX :204,
        spriteY :3,
        largura :50,
        altura :35,
        x :100,
        y :350,

        movimentos :[
            {spriteX :151, spriteY : 10},
            {spriteX :204 , spriteY : 3},
        ],
        framesAtual :0,
        atualizaFrame(){

            const intervaloFrames = 10;
            const passouIntervalo = frames % intervaloFrames === 0 ;
            if(passouIntervalo){
                    const baseIncremento = 1;
                    const incremento = baseIncremento + passaro.framesAtual;
                    const baseRepeticao = passaro.movimentos.length;
                    passaro.framesAtual = incremento % baseRepeticao; 
                }
               
    },

     pares : [],

        desenha(){
            const {spriteX , spriteY } = passaro.movimentos[passaro.framesAtual];

            passaro.pares.forEach(function(par){
                const passaroX = par.x;
                const passaroY = canvas.height - 156;
                passaro.atualizaFrame(); 
                contexto.drawImage(
                sprites, 
                spriteX,spriteY,
                passaro.largura,passaro.altura, 
                passaroX,passaroY, 
                passaro.largura,passaro.altura, 
                );
          })
        },
        atualiza(){
            const passou100Frames = frames %300 === 0;
            if(passou100Frames){
                passaro.pares.push({
                    x:canvas.width,
                })
            }
            passaro.pares.forEach(function(par){
                par.x = par.x -5;
                
                if(par.x + passaro.largura <= -50){
                    passaro.pares.shift();
                }
           });
        }

        }
    
    return passaro;
}





function verificarAltura(Trex,canvas){

    if(Trex.y > canvas.height -60){
        return true;
    }
  
    return;
}

const planoFundo = {
     desenha(){
         contexto.fillStyle = '#fff';
         contexto.fillRect(0,0,canvas.width,canvas.height);
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
    if(telaAtiva.inicializar){
        telaAtiva.inicializar();
    }
}
const telas = { 

    INICIO : { 
        inicializar(){
           globais.Trex =  criaTrex();
           globais.chao = criaChao();
           globais.cacto = criaCactos();
           globais.passaro = criaPassaro();
        },
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
            globais.chao.desenha();
            globais.cacto.desenha();
            globais.cacto.atualiza();
            globais.passaro.atualiza();
            globais.passaro.desenha();
            globais.Trex.desenha();
        },
        keydown(){
            if(globais.Trex.y == 446.25){
                globais.Trex.pula();           
            }
        
        },
        atualiza(){
            globais.chao.atualiza();
            globais.Trex.atualizaQueda();
        }
    },
   

};





function loop(){

    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    frames  = frames +1;
    requestAnimationFrame(loop);
}
window.addEventListener('keydown' ,function(){
    if(telaAtiva.keydown){
        telaAtiva.keydown();
    }
});

mudaTela(telas.INICIO);
loop();
