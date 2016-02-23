$(document).ready(function(e) {
	creaBDCoches();
	$("#cogefoto").change(function(e){
		$("#fotocoche").attr("src","img/"+$("#cogefoto").val());
	});
$("#rebajar").click(function(e){
	alert("a descontar");
	ejecutaTransacion(10);
});
$("#guardar").click(function(e) {
	ejecutaTransacion(1);
});
$("#listar").click(function(e) {
	ejecutaTransacion(2);
});
$("#listamarca").click(function(e) {
	ejecutaTransacion(3);
});
$("#listapotencia").click(function(e) {
	ejecutaTransacion(4);
});
$("#listaanio").click(function(e) {
	ejecutaTransacion(5);
});
$("#comprar").click(function(e) {
	ejecutaTransacion(6);
});
$("#barato").click(function(e) {
	ejecutaTransacion(7);
});
$("#potente").click(function(e) {
	ejecutaTransacion(8);
});
$("#antiguo").click(function(e) {
	ejecutaTransacion(9);
});
$("#busquedas").keyup(function(e){
	ejecutaTransacion(11);
});
$(".volver").click(function(e) {
	$("#marca").val("");
	$("#modelo").val("");
	$("#anio").val("");
	$("#ejes").val("");
	$("#cilindrada").val("");
	$("#valor").val("");
	$("#files").val("");
	location.href="#Mipagina";
});
$("#atras").click(function(e){
	location.href="#listarcoche";
});
});
function creaBDCoches(){
    	MiCoches=openDatabase("BdCoches","1.0","MiCoches",2*1024);
        if(MiCoches!=null){
            MiCoches.transaction(crearCoches,errorCrearCoches);
        } else {
            alert("La bbdd no se creo. Revise el proceso");
                        
        }

} 
function crearCoches(txt){
    txt.executeSql("CREATE TABLE IF NOT EXISTS Coches (idcoche INTEGER PRIMARY KEY AUTOINCREMENT, marca TEXT NOT NULL, modelo TEXT, anio INT, ejes TEXT, cilindrada INT NOT NULL, valor INT NOT NULL,tipo TEXT NOT NULL, foto TEXT)");
}
function errorCrearCoches(err){
console.log("Error al ejecutar la sentencia de crear Coches"+err.code+err.message);
}

function ejecutaTransacion(numero){
    switch(numero){
        case 1: MiCoches.transaction(guardaCoches,errorCrearCoches);
            break;
            case 2: MiCoches.transaction(listaCoches,errorCrearCoches);
            break;
            case 3: MiCoches.transaction(listamarca,errorCrearCoches);
            break;
            case 4: MiCoches.transaction(listapotencia,errorCrearCoches);
            break;
            case 5: MiCoches.transaction(listaanio,errorCrearCoches);
            break;
            case 6: MiCoches.transaction(borraCoches,errorCrearCoches);
            break;
            case 7: MiCoches.transaction(masbarato,errorCrearCoches);
            break;
            case 8: MiCoches.transaction(maspotente,errorCrearCoches);
            break;
            case 9: MiCoches.transaction(masantiguo,errorCrearCoches);
            break;
            case 10: MiCoches.transaction(actualizar,errorCrearCoches);
            break;
            case 11: MiCoches.transaction(busqueda,errorCrearCoches);
            break;
            
    }
}
function busqueda(txt){
	$('#listado').html("<span></span>");
	parametros=$('#busquedas').val();
	MiCoches.transaction(function (txt){
    	txt.executeSql("Select * from Coches WHERE modelo like '%"+parametros+"%' or anio like '%"+parametros+"%'",[],function(txt,resultado){
    	var nCoches=resultado.rows.length;
        $("#listado").listview();
        for (var i=0;i<nCoches;i++){
            var Coches=resultado.rows.item(i);
            $("#listado").append("<li><a href='' id='"+Coches.idcoche+"' class='coches'>"+Coches.marca+" "+Coches.modelo+", Año: "+Coches.anio+"</a></li>");
        }
		$(".coches").click(function(e){
				id=$(this).attr("id");
				window.location.href ="#fichatecnica";
				MiCoches.transaction(function (txt){
    			txt.executeSql("Select * from Coches WHERE rowid="+id,[],function(txt,resultado){
    				var nCoches=resultado.rows.length;
        			$("#listado").listview();
            			var Coche=resultado.rows.item(0);
						
						$("#mostrarmarca").html(Coche.marca);
						$("#mostrarfoto").attr("src","img/"+Coche.foto);
						$("#mostrarmarca").html(Coche.marca);
						$("#mostraranio").html(Coche.anio);
						$("#mostrarpotencia").html(Coche.cilindrada+" cc");
						$("#mostrarvalor").html(Coche.valor+" €");
						$("#comprar").attr("data-idc",id);
						
        			$("#listado").listview("refresh");
				});
			});    
		});
        $("#listado").listview("refresh");
	});
});
}

function guardaCoches(txt){
    var Mimarca=$("#marca").val().toUpperCase();
	$("#marca").val("");
    var Mimodelo=$("#modelo").val().toUpperCase();
	$("#modelo").val("");
    var Mianio=$("#anio").val();
	$("#anio").val("");
    var Miejes=$("#ejes").val();
	$("#ejes").val("");
    var Micilindrada=$("#cilindrada").val();
	$("#cilindrada").val("");
    var Mivalor=$("#valor").val();
	$("#valor").val("");
    var Mitipo=$("#tipo").val();
    var Mifoto=$("#cogefoto").val();
    txt.executeSql("INSERT INTO Coches (marca, modelo, anio, ejes, cilindrada, valor, tipo, foto) values (?,?,?,?,?,?,?,?)",[Mimarca,Mimodelo,Mianio,Miejes,Micilindrada,Mivalor,Mitipo,Mifoto]);
    alert("He guardado el coche");
}

function listaCoches(txt){
	$('#listado').html("<span></span>");
	MiCoches.transaction(function (txt){
    	txt.executeSql("Select * from Coches",[],function(txt,resultado){
    	var nCoches=resultado.rows.length;
        $("#listado").listview();
        for (var i=0;i<nCoches;i++){
            var Coches=resultado.rows.item(i);
            $("#listado").append("<li><a href='' id='"+Coches.idcoche+"' class='coches'>"+Coches.marca+" "+Coches.modelo+", Año: "+Coches.anio+"</a></li>");
        }
		$(".coches").click(function(e){
				id=$(this).attr("id");
				window.location.href ="#fichatecnica";
				MiCoches.transaction(function (txt){
    			txt.executeSql("Select * from Coches WHERE rowid="+id,[],function(txt,resultado){
    				var nCoches=resultado.rows.length;
        			$("#listado").listview();
            			var Coche=resultado.rows.item(0);
						
						$("#mostrarmarca").html(Coche.marca);
						$("#mostrarfoto").attr("src","img/"+Coche.foto);
						$("#mostrarmarca").html(Coche.marca);
						$("#mostraranio").html(Coche.anio);
						$("#mostrarpotencia").html(Coche.cilindrada+" cc");
						$("#mostrarvalor").html(Coche.valor+" €");
						$("#comprar").attr("data-idc",id);
						
        			$("#listado").listview("refresh");
				});
			});    
		});
        $("#listado").listview("refresh");
	});
});                  
}

function listamarca(txt){
	$('#listado').html("<span></span>");
	MiCoches.transaction(function (txt){
    	txt.executeSql("Select * from Coches order by marca ASC",[],function(txt,resultado){
    	var nCoches=resultado.rows.length;
        $("#listado").listview();
        for (var i=0;i<nCoches;i++){
            var Coches=resultado.rows.item(i);
           $("#listado").append("<li><a href='' id='"+Coches.idcoche+"' class='coches'>"+Coches.marca+" "+Coches.modelo+", Año: "+Coches.anio+"</a></li>");
        }
		$(".coches").click(function(e){
				id=$(this).attr("id");
				window.location.href ="#fichatecnica";
				MiCoches.transaction(function (txt){
    			txt.executeSql("Select * from Coches WHERE rowid="+id,[],function(txt,resultado){
    				var nCoches=resultado.rows.length;
        			$("#listado").listview();
            			var Coche=resultado.rows.item(0);
						
						$("#mostrarmarca").html(Coche.marca);
						$("#mostrarfoto").attr("src","img/"+Coche.foto);
						$("#mostrarmarca").html(Coche.marca);
						$("#mostraranio").html(Coche.anio);
						$("#mostrarpotencia").html(Coche.cilindrada+" cc");
						$("#mostrarvalor").html(Coche.valor+" €");
						$("#comprar").attr("data-idc",id);
						
        			$("#listado").listview("refresh");
				});
			});    
		});
        $("#listado").listview("refresh");
	});
});                  
}

function listapotencia(txt){
	$('#listado').html("<span></span>");
	MiCoches.transaction(function (txt){
    	txt.executeSql("Select * from Coches order by cilindrada ASC",[],function(txt,resultado){
    	var nCoches=resultado.rows.length;
        $("#listado").listview();
        for (var i=0;i<nCoches;i++){
            var Coches=resultado.rows.item(i);
            $("#listado").append("<li><a href='' id='"+Coches.idcoche+"' class='coches'>"+Coches.marca+" "+Coches.modelo+", Año: "+Coches.anio+"</a></li>");
        }
		$(".coches").click(function(e){
				id=$(this).attr("id");
				window.location.href ="#fichatecnica";
				MiCoches.transaction(function (txt){
    			txt.executeSql("Select * from Coches WHERE rowid="+id,[],function(txt,resultado){
    				var nCoches=resultado.rows.length;
        			$("#listado").listview();
            			var Coche=resultado.rows.item(0);
						
						$("#mostrarmarca").html(Coche.marca);
						$("#mostrarfoto").attr("src","img/"+Coche.foto);
						$("#mostrarmarca").html(Coche.marca);
						$("#mostraranio").html(Coche.anio);
						$("#mostrarpotencia").html(Coche.cilindrada+" cc");
						$("#mostrarvalor").html(Coche.valor+" €");
						$("#comprar").attr("data-idc",id);
						
        			$("#listado").listview("refresh");
				});
			});    
		});
        $("#listado").listview("refresh");
	});
});                  
}

function listaanio(txt){
	$('#listado').html("<span></span>");
	MiCoches.transaction(function (txt){
    	txt.executeSql("Select * from Coches order by anio ASC",[],function(txt,resultado){
    	var nCoches=resultado.rows.length;
        $("#listado").listview();
        for (var i=0;i<nCoches;i++){
            var Coches=resultado.rows.item(i);
           $("#listado").append("<li><a href='' id='"+Coches.idcoche+"' class='coches'>"+Coches.marca+" "+Coches.modelo+", Año: "+Coches.anio+"</a></li>");
        }
		$(".coches").click(function(e){
				id=$(this).attr("id");
				window.location.href ="#fichatecnica";
				MiCoches.transaction(function (txt){
    			txt.executeSql("Select * from Coches WHERE rowid="+id,[],function(txt,resultado){
    				var nCoches=resultado.rows.length;
        			$("#listado").listview();
            			var Coche=resultado.rows.item(0);
						
						$("#mostrarmarca").html(Coche.marca);
						$("#mostrarfoto").attr("src","img/"+Coche.foto);
						$("#mostrarmarca").html(Coche.marca);
						$("#mostraranio").html(Coche.anio);
						$("#mostrarpotencia").html(Coche.cilindrada+" cc");
						$("#mostrarvalor").html(Coche.valor+" €");
						$("#comprar").attr("data-idc",id);
						
        			$("#listado").listview("refresh");
				});
			});    
		});
        $("#listado").listview("refresh");
	});
});             
}

function borraCoches(txt){
	id=$('#comprar').attr("data-idc");
	MiCoches.transaction(function (txt){
    	txt.executeSql("DELETE FROM coches WHERE idcoche="+id,[],function(txt,resultado){
    		alert("coche borrado de la BBDD");
			location.href="#listarcoche";
			$("#"+id).css("display","none");
		});
	});      
}

function masbarato(txt){
	$('#listado').html("<span></span>");
	MiCoches.transaction(function (txt){
    	txt.executeSql("Select * from Coches order by valor ASC",[],function(txt,resultado){
    	var nCoches=resultado.rows.length;
        $("#listado").listview();
            var Coches=resultado.rows.item(0);
            $("#listado").append("<li><a href='' id='"+Coches.idcoche+"' class='coches'>"+Coches.marca+" "+Coches.modelo+", Año: "+Coches.anio+"</a></li>");
        
		$(".coches").click(function(e){
				id=$(this).attr("id");
				window.location.href ="#fichatecnica";
				MiCoches.transaction(function (txt){
    			txt.executeSql("Select * from Coches WHERE rowid="+id,[],function(txt,resultado){
    				var nCoches=resultado.rows.length;
        			$("#listado").listview();
            			var Coche=resultado.rows.item(0);
						
						$("#mostrarmarca").html(Coche.marca);
						$("#mostrarfoto").attr("src","img/"+Coche.foto);
						$("#mostrarmarca").html(Coche.marca);
						$("#mostraranio").html(Coche.anio);
						$("#mostrarpotencia").html(Coche.cilindrada+" cc");
						$("#mostrarvalor").html(Coche.valor+" €");
						$("#comprar").attr("data-idc",id);
						
        			$("#listado").listview("refresh");
				});
			});    
		});
        $("#listado").listview("refresh");
	});
});                  
}

function maspotente(txt){
	$('#listado').html("<span></span>");
	MiCoches.transaction(function (txt){
    	txt.executeSql("Select * from Coches order by cilindrada DESC",[],function(txt,resultado){
    	var nCoches=resultado.rows.length;
        $("#listado").listview();
            var Coches=resultado.rows.item(0);
            $("#listado").append("<li><a href='' id='"+Coches.idcoche+"' class='coches'>"+Coches.marca+" "+Coches.modelo+", Año: "+Coches.anio+"</a></li>");
        
		$(".coches").click(function(e){
				id=$(this).attr("id");
				window.location.href ="#fichatecnica";
				MiCoches.transaction(function (txt){
    			txt.executeSql("Select * from Coches WHERE rowid="+id,[],function(txt,resultado){
    				var nCoches=resultado.rows.length;
        			$("#listado").listview();
            			var Coche=resultado.rows.item(0);
						
						$("#mostrarmarca").html(Coche.marca);
						$("#mostrarfoto").attr("src","img/"+Coche.foto);
						$("#mostrarmarca").html(Coche.marca);
						$("#mostraranio").html(Coche.anio);
						$("#mostrarpotencia").html(Coche.cilindrada+" cc");
						$("#mostrarvalor").html(Coche.valor+" €");
						$("#comprar").attr("data-idc",id);
						
        			$("#listado").listview("refresh");
				});
			});    
		});
        $("#listado").listview("refresh");
	});
});             
}
function masantiguo(txt){
	$('#listado').html("<span></span>");
	MiCoches.transaction(function (txt){
    	txt.executeSql("Select * from Coches order by anio ASC",[],function(txt,resultado){
    	var nCoches=resultado.rows.length;
        $("#listado").listview();
            var Coches=resultado.rows.item(0);
            $("#listado").append("<li><a href='' id='"+Coches.idcoche+"' class='coches'>"+Coches.marca+" "+Coches.modelo+", Año: "+Coches.anio+"</a></li>");
        
		$(".coches").click(function(e){
				id=$(this).attr("id");
				window.location.href ="#fichatecnica";
				MiCoches.transaction(function (txt){
    			txt.executeSql("Select * from Coches WHERE rowid="+id,[],function(txt,resultado){
    				var nCoches=resultado.rows.length;
        			$("#listado").listview();
            			var Coche=resultado.rows.item(0);
						
						$("#mostrarmarca").html(Coche.marca);
						$("#mostrarfoto").attr("src","img/"+Coche.foto);
						$("#mostrarmarca").html(Coche.marca);
						$("#mostraranio").html(Coche.anio);
						$("#mostrarpotencia").html(Coche.cilindrada+" cc");
						$("#mostrarvalor").html(Coche.valor+" €");
						$("#comprar").attr("data-idc",id);
						
        			$("#listado").listview("refresh");
				});
			});    
		});
        $("#listado").listview("refresh");
	});
});
}

function actualizar(txt){
	precio=$("#precio_rebajar").val();
	if(precio=="" || precio==null){
		precio=1;
	}
	MiCoches.transaction(function (txt){
    	txt.executeSql("Select * from Coches WHERE valor>"+precio,[],function(txt,resultado){
			var nCoches=resultado.rows.length;
    		for (var i=0;i<nCoches;i++){
            	var Coche=resultado.rows.item(i);
				valornuevo=Coche.valor*0.9;
				idc=Coche.idcoche;
				actualizar2(valornuevo,idc);
			}
		});
	});
}
function actualizar2(valor, id){
	MiCoches.transaction(function (txt){
    	txt.executeSql("UPDATE Coches SET valor="+valor+" WHERE idcoche="+id,[],function(txt,result){
						
		});
	});
}
