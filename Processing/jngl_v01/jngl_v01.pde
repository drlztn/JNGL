/*  //<>//
 /// JNGL v0.1
 /// DRLZTN @ 2019
 
 /// Instrucciones:
 - Establecer los colores para la pieza usando los códigos de color hezadecimal (ej: #FFFFFF) [línea 39].
 - Quitar el comentario de las letras que quiera utilizar (debajo de pool.autoAddToStage()
   dentro de la función wildstyle() [linea 67]).
 - Al iniciar la aplicación podrá generar nuevas composiciones haciendo click en el botón GO!
   y podrá guardar la composición haciendo click en el botón Guardar.
 - Puede usar los sliders para manipular las variables y cambiar los colores introduciendo
   los códigos de color en los recuadros de la parte de abajo (UNO POR UNO!)
 - Puede cambiar la fuente en la línea 64, esta debe estar en la carpeta 'data'.
*/

import hype.*;
import hype.extended.colorist.HColorPool;
import hype.extended.layout.HGridLayout;
import processing.pdf.*;
import controlP5.*;

HDrawablePool pool;
HGridLayout layout;
HColorPool colores;
ControlP5 cp5;

int ancho_canvas = 1600;
int alto_canvas = 900;

int espaciado_x = 50;
int espaciado_y = 40;
int num_columnas = 15;

int inicio_x = ancho_canvas/2 - (num_columnas * (espaciado_x/2));
float inicio_y = alto_canvas/3;

int tam_letra = 15;
int cantidad_letras = 80;

String color1 = "ffff66";
String color2 = "ccff33";
String color3 = "99e699";
String color4 = "000000";

void settings() {
  size(ancho_canvas, alto_canvas);
}

void setup() {
  H.init(this).background(#FFFFFF); 
  wildstyle();
  controles();
}

void wildstyle() {
  layout = new HGridLayout()
    .startX(inicio_x)
    .startY(inicio_y)
    .spacing(espaciado_x, espaciado_y)
    .cols(num_columnas)
    ;

  colores = new HColorPool(unhex("FF" + color1), unhex("FF" + color2), unhex("FF" + color3), unhex("FF" + color4));
  PFont type = createFont("MagikMarker.otf", 1);

  //Letras que serán utilizadas. Quitar el comentario para que se vean en el canvas o comentar para que no se vean.
  pool = new HDrawablePool(cantidad_letras);
  pool.autoAddToStage()
    //.add(new HText("a", tam_letra, type))
    //.add(new HText("b", tam_letra, type))
    //.add(new HText("c", tam_letra, type))
    //.add(new HText("d", tam_letra, type))
    .add(new HText("e", tam_letra, type))
    //.add(new HText("f", tam_letra, type))
    .add(new HText("g", tam_letra, type))
    //.add(new HText("h", tam_letra, type))
    //.add(new HText("i", tam_letra, type))
    //.add(new HText("j", tam_letra, type))
    //.add(new HText("k", tam_letra, type ))
    .add(new HText("l", tam_letra, type))
    //.add(new HText("m", tam_letra, type))
    .add(new HText("n", tam_letra, type))
    //.add(new HText("Ñ", tam_letra, type))
    //.add(new HText("o", tam_letra, type))
    //.add(new HText("p", tam_letra, type))
    //.add(new HText("q", tam_letra, type))
    .add(new HText("r", tam_letra, type))
    //.add(new HText("s", tam_letra, type))
    .add(new HText("t", tam_letra, type))
    .add(new HText("u", tam_letra, type))
    //.add(new HText("v", tam_letra, type))
    //.add(new HText("w", tam_letra, type))
    //.add(new HText("x", tam_letra, type))
    //.add(new HText("y", tam_letra, type))
    //.add(new HText("z", tam_letra, type))

    //.add(new HText("0", tam_letra, type))
    //.add(new HText("1", tam_letra, type))
    //.add(new HText("2", tam_letra, type))
    //.add(new HText("3", tam_letra, type))
    //.add(new HText("4", tam_letra, type))
    //.add(new HText("5", tam_letra, type))
    //.add(new HText("6", tam_letra, type))
    .add(new HText("7", tam_letra, type))
    //.add(new HText("8", tam_letra, type))
    .add(new HText("9", tam_letra, type))

    //.add(new HText("*", tam_letra, type))
    //.add(new HText("@", tam_letra, type))
    .add(new HText("&", tam_letra, type))
    //.add(new HText("(", tam_letra, type))
    //.add(new HText(")", tam_letra, type))
    //.add(new HText(".", tam_letra, type))
    //.add(new HText("<", tam_letra, type))
    //.add(new HText(">", tam_letra, type))
    //.add(new HText("'", tam_letra, type))

    .layout(layout)
    .onCreate(
    new HCallback() {
    public void run(Object obj) {
      HText t = (HText) obj;
      t
        .fill(colores.getColor())
        .scale(((int)random(tam_letra - 7, tam_letra)*2))
        .anchorAt(H.CENTER)
        .rotation(random(360))
        ;
    }
  }
  )
  .shuffleRequestAll();
}

void controles() {  
  cp5 = new ControlP5(this);
  cp5.addBang("reset")
    .setPosition(20, 10)
    .setSize(30, 30)
    .setTriggerEvent(Bang.RELEASE)
    .setLabel("GO!")
    .setColorForeground(0)
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;

  cp5.addBang("save_pdf")
    .setPosition(60, 10)
    .setSize(30, 30)
    .setTriggerEvent(Bang.RELEASE)
    .setLabel("GUARDAR")
    .setColorForeground(0)
    .setColorActive(color(128, 255, 0)) 
    .setColorLabel(0)
    ;

  cp5.addSlider("num_columnas")
    .setPosition(20, 60)
    .setSize(150, 20)
    .setRange(5, 20)
    .setLabel("# COLUMNAS")
    .setColorBackground(0)
    .setColorForeground(color(100))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;

  cp5.addSlider("espaciado_x")
    .setPosition(20, 100)
    .setSize(150, 20)
    .setRange(40, 80)
    .setLabel("Espaciado X")
    .setColorBackground(0)
    .setColorForeground(color(100))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;

  cp5.addSlider("espaciado_y")
    .setPosition(20, 140)
    .setSize(150, 20)
    .setRange(20, 80)
    .setLabel("Espaciado Y")
    .setColorBackground(0)
    .setColorForeground(color(100))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;

  cp5.addSlider("tam_letra")
    .setPosition(20, 180)
    .setSize(150, 20)
    .setRange(10, 20)
    .setLabel("Tam Letra")
    .setColorBackground(0)
    .setColorForeground(color(100))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;

  cp5.addSlider("cantidad_letras")
    .setPosition(20, 220)
    .setSize(150, 20)
    .setRange(0, 150)
    .setLabel("# Letras")
    .setColorBackground(0)
    .setColorForeground(color(100))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;

  cp5.addTextfield("color1")
    .setPosition(20, alto_canvas - 60)
    .setSize(50, 30)
    .setAutoClear(true)
    .setLabel("Color 1")
    .setColorBackground(0)
    .setColorForeground(color(0))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;

  cp5.addTextfield("color2")
    .setPosition(90, alto_canvas - 60)
    .setSize(50, 30)
    .setAutoClear(true)
    .setLabel("Color 2")
    .setColorBackground(0)
    .setColorForeground(color(0))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;

  cp5.addTextfield("color3")
    .setPosition(160, alto_canvas - 60)
    .setSize(50, 30)
    .setAutoClear(true)
    .setLabel("Color 3")
    .setColorBackground(0)
    .setColorForeground(color(0))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;

  cp5.addTextfield("color4")
    .setPosition(230, alto_canvas - 60)
    .setSize(50, 30)
    .setAutoClear(true)
    .setLabel("Color 4")
    .setColorBackground(0)
    .setColorForeground(color(0))
    .setColorActive(color(180)) 
    .setColorLabel(0)
    ;
}

public void reset() {
  pool.drain();  
  wildstyle();  
  println("Nuevo TAG");
}

public void save_pdf() {
  int d = day();
  int m = month();
  int y = year();
  int s = second();
  int mi = minute();
  int h = hour();

  PGraphics vectores = null;
  vectores = beginRecord(PDF, d + "_" + m + "_" + y + "_" + h + mi + s + ".pdf");

  if (vectores==null) {
    H.drawStage();
  } else {
    H.stage().paintAll(vectores, false, 1);
  }  

  endRecord();
  println("Guardado como " + d + "_" + m + "_" + y + "_" + h + mi + s + ".pdf");
}

void draw() {
  H.drawStage();
}
