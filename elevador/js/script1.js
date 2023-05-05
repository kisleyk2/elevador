class Elevador{    
    constructor(andarAtual,totalPes) {
        this.totalAndares = 7
        this.capacidade = 5
        this.andarAtual = andarAtual
        this.totalPessoas = totalPes
        this.verifica = document.querySelector('.bt').value
        this.andar = document.querySelector('.andar')        
        this.qtdPessoa = document.querySelector('.qtdPes')
        this.elevador = document.querySelector('.espElev')
    }

    abrirPorta() {
        let pE = document.querySelector('.pE')
        let pD = document.querySelector('.pD')
        
        if (this.verifica == 'Abrir') {
            setTimeout(()=>{
                pE.classList.remove('fecharEsq')
                pD.classList.remove('fecharDir')
                pE.classList.add('abrirEsq')
                pD.classList.add('abrirDir')
                this.verifica = 'Fechar'
            },200)
        } else {
            setTimeout(()=>{
                pE.classList.remove('abrirEsq')
                pD.classList.remove('abrirDir')
                pE.classList.add('fecharEsq')
                pD.classList.add('fecharDir')
                this.verifica = 'Abrir'
            },200)
        }        
    }

    verificaPorta(v) {
        let andarAtual = this.andarAtual
        let andar = this.andar
        if (v == 'Fechar' || v == 'Abrir') {
            setTimeout(function() {
                andar.value = andarAtual               
                
                document.querySelector('.bt').click() //fechar a porta automaticamente
            },3000)

            if (v == 'Fechar')
                this.andar.value = 'Fechando portas...'
            else
                this.andar.value = 'Abrindo Portas...' 
        }
    }

    movimentarElevador(v,pos) {
        let div = document.querySelectorAll('.andares')[pos]
        let elev = document.querySelector('.fund')
        let letreiro = document.querySelector('.letreiro')
        
        if (v == "subir" || v == "descer") {
            setTimeout(()=> {
                div.appendChild(elev)
                window.location.href = `#${pos}` //redirecionamento na página
            },1000)
            
            if (pos == 0) 
                letreiro.value = 'Térreo'
            else 
                letreiro.value = 'Andar' 
        }        
    }

    subir(v) {
        if (this.verifica == "Fechar")
            this.verificaPorta(this.verifica)
        else {
            if(this.andarAtual > 0 && this.andarAtual <= this.totalAndares) {
                this.andarAtual -= v                
                this.movimentarElevador("subir",this.andarAtual)
                this.andar.value = this.andarAtual
                let andarAtual = this.andarAtual
                let andar = this.andar

                setTimeout(()=>{
                    andar.value = andarAtual          
                },2000)        
                this.andar.value = `Subindo...`
            } else {
                let andarAtual = this.andarAtual 
                let andar = this.andar
                this.andar.value = `Estamos no Térreo`            
                setTimeout(function() {
                    andar.innerHTML = andarAtual //não reconhece o atributo preciso criar uma nova variável
                }, 3000)
            }
        }        
    }

    descer(v) {
        if (this.verifica  == "Fechar")
            this.verificaPorta(this.verifica) //vai verificar se a porta está aberta e fechar
        else { //vai descer o elevador
            if (this.andarAtual >= 0 && this.andarAtual < this.totalAndares) {
                this.andarAtual += v
                this.movimentarElevador("descer",this.andarAtual)
                this.andar.value = this.andarAtual
                let andarAtual = this.andarAtual
                let andar = this.andar

                setTimeout(()=>{
                    andar.value = andarAtual          
                },2000)        
                this.andar.value = `Descendo...`
            }
            else {
                let andarAtual = this.totalAndares
                let andar = this.andar
                this.andar.value = `Último Andar`            
                setTimeout(function() {
                    andar.value = andarAtual
                }, 3000)                
            }
        }        
    }
    
    entrar(v) {
        if (this.verifica == "Abrir")
            this.verificaPorta(this.verifica)
        else {
            if ((v + this.totalPessoas) <= this.capacidade) {
                this.inserir(this.totalPessoas+1,'entrar')
                this.totalPessoas += v
                this.qtdPessoa.value = this.totalPessoas                
            } else {
                this.andar.value = 'Alcançada a capacidade'
                setTimeout(()=> {                    
                    document.querySelector('.bt').click()

                    this.andar.value = this.andarAtual
                },3000)
            }
        }
    }

    sair(v) {
        if (this.verifica  == "Abrir")
            this.verificaPorta(this.verifica )
        else {
            if (this.totalPessoas > 0) {
                this.inserir(this.totalPessoas,'sair')
                this.totalPessoas -= v
                this.qtdPessoa.value = this.totalPessoas                
            }
            else {
                this.andar.value = 'Vazio!'
                setTimeout(()=> {                    
                    document.querySelector('.bt').click()
                    
                    this.andar.value = this.andarAtual
                },3000)
            }
        }
    }

    inserir(v,caso) {
        let pes = document.querySelector('.pes')
        let imgPes = document.createElement('img')
        if (caso == 'entrar') {
            imgPes.src = `images/pes${v}.png`
            imgPes.setAttribute('id',`img${v}`)        
            pes.appendChild(imgPes)
        }
        else {
            let img = document.querySelector(`div #img${v}`)
            img.remove()
        }
    }
}

function iniciar() {
    let body = document.querySelector('body')
    let inic = document.querySelector('.inic')
    let script = document.createElement('script')
    let tAnd = document.querySelector('.andar')   
    var tPes = document.querySelector('.qtdPes')
    var and = parseFloat(tAnd.value) // converter para number
    var pes = parseInt(tPes.value) //converter para number

    if (inic.value == "Inicializar") {
        if(tAnd.value == 0) {
            and = 0 
            pes = 0 
        } 

        iniciarElevador = new Elevador(and,pes) 
        inic.style.backgroundColor = 'green'
        inic.value = 'Desligar'

        setTimeout(()=>{
            tAnd.value = and            
        },2000)

        tAnd.value = 'Iniciando...'        
    } else {
        and = iniciarElevador.andarAtual 
        pes = iniciarElevador.totalPessoas 

        inic.style.backgroundColor = 'red'
        inic.value = "Inicializar"
        iniciarElevador = null

        setTimeout(()=>{
            tAnd.value = and            
        },2000)

        tAnd.value = `Desligando...`
    }
}

function preparaAndar() {
    /*let cores = ['orange','purple','blue','brown','lime','yellow','pink','aquamarine']*/
    let body = document.querySelector('body')

    for (let i = 0; i < 8; i++) {        
        let div = document.createElement('div')
        div.classList.add('andares')
        div.setAttribute('id',i)
        //div.style.backgroundColor = `${cores[i]}`
        div.style.background = `no-repeat center/110% url(images/img${i}.png)`

        let link = document.createElement('a')
        link.href = `#${i}`
        link.style.opacity = 0

        if (i == 0) {           
            body.appendChild(div)
            div.appendChild(document.querySelector('.fund'))
            div.appendChild(link)
        } else {
            body.appendChild(div)
            div.appendChild(link)
        }
    }
}