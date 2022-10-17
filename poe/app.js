var content_operacion=document.getElementById('caja-operacion');
var content_resultado=document.getElementById('caja-resultado');
var btn_calcular=document.getElementById('btn-calcular');
var content_calculadora=document.getElementById('content-calculadora');

var operadores=[
	{value:"/",prioridad:true},
	{value:"*",prioridad:true},
	{value:"+",prioridad:null},
	{value:"_",prioridad:null}
];

function generarCalculadora(){
	
}

function prioridadJerarquia(texto=""){
	for(let a=0; a<this.operadores.length; a++){
		if(this.operadores[a].prioridad){
			if(this.operadores[a].prioridad!=null){
				if(this.encontrarOperador(texto,this.operadores[a].value)==texto.length){
					this.operadores[a].prioridad=false;
				}else{
					return this.operadores[a].value;
				}
			}
		}
	}
	return null;
}

function hayPrioridad(){
	for(let a=0; a<this.operadores.length; a++){
		if(this.operadores[a].prioridad){
			return true;
		}
	}
	return false;
}

function procedimiento(texto){
	let posi=encontrarOperador(texto,this.hayPrioridad()?this.prioridadJerarquia(texto):null,0);
	if(texto.substring(posi+1,posi+2)==this.operadores[3].value){
		texto=texto.substring(0,posi+1)+"-"+texto.substring(posi+2,texto.length);
	}else
	if(texto.substring(posi+1,posi+2)==this.operadores[2].value){
		texto=texto.substring(0,posi+1)+texto.substring(posi+2,texto.length);
	}
	let inicio=encontrarInicio(texto,posi-1);
	let fin=encontrarFin(texto,posi+1);
	let sub_resultado=texto.substring(inicio==0?0:inicio+1,fin);
	let sub_operador=texto.replace(sub_resultado,resultado(sub_resultado));
	console.log(sub_operador);
	if(encontrarOperador(sub_operador,this.hayPrioridad()?this.prioridadJerarquia(sub_operador):null)==sub_operador.length){
		this.content_resultado.value=((sub_operador??"NaN")=="NaN")?"Error de sintaxis":sub_operador;
		return;
	}else{
		procedimiento(sub_operador);
	}
}

function resultado(texto){
	let inicio=encontrarOperador(texto,this.hayPrioridad()?this.prioridadJerarquia(texto):null,0);
	let fin=inicio+1;
	let operador=texto.substring(inicio,fin);
	let num1=Number(texto.substring(0,inicio));
	let num2=Number(texto.substring(fin,texto.length));
	let result=0;
	switch(operador){
		case this.operadores[0].value: result=num1/num2; break;
		case this.operadores[1].value: result=num1*num2; break;
		case this.operadores[2].value: result=num1+num2; break;
		case this.operadores[3].value: result=num1-num2; break;
		default: result=num1+num2;
	}
	return result;
}

function encontrarOperador(texto,operador_=null,inicio=0){
	for(let a=inicio; a<texto.length; a++){
		for(let b=0; b<this.operadores.length; b++){
			if(texto[a]==this.operadores[b].value && (operador_==null || this.operadores[b].value==operador_)){
				return a;
			}
		}
	}
	return texto.length;
}

function encontrarInicio(texto,inicio){
	for(let a=inicio; a>0; a--){
		for(let b=0; b<this.operadores.length; b++){
			if(texto[a]==this.operadores[b].value){
				return a;
			}
		}
	}
	return 0;
}

function encontrarFin(texto,inicio){
	for(let a=inicio; a<texto.length; a++){
		for(let b=0; b<this.operadores.length; b++){
			if(texto[a]==this.operadores[b].value){
				return a;
			}
		}
	}
	return texto.length;
}

function validadEntrada(texto){
	if(texto.length>300){
		return null;
	}
	for(let a=0; a<texto.length; a++){
		switch(texto[a]){
			case "*": case "/":
				if((texto[a+1]??"")!="-" && !Number((texto[a+1]??"")) && texto[a+1]!="."){
					texto=(texto[a+1]??"")==""?texto:texto.substring(0,a+1)+texto.substring(a+2,texto.length);
				}
				break;
		}
	}
	this.content_operacion.value=texto;
	return texto.replaceAll("-",this.operadores[3].value);
}

function calcular(){
	let texto=this.content_operacion.value.replaceAll(" ","");
	texto=validadEntrada(texto)??"";
	texto=(texto.substring(0,1)==this.operadores[3].value)?texto.replace(this.operadores[3].value,"-"):texto;
	if(texto==""){
		this.content_resultado.value="";
	}else{
		this.procedimiento(texto);
	}
	for(let a=0; a<this.operadores.length; a++){
		if(this.operadores[a].prioridad==false){
			this.operadores[a].prioridad=true;
		}
	}
}

btn_calcular.addEventListener("click",()=>{
	calcular();
});
content_operacion.addEventListener("keyup",()=>{
	calcular();
});