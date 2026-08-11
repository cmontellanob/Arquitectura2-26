/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.sis258.single.responsability.rompe;

/**
 *
 * @author Dell
 */
public class Coche {
    String marca;

    public Coche(String marca) {
        this.marca = marca;
    }

    public Coche() {
    }
    

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }
    public void guardarCocheDb(){
        System.out.println("se gurda enla base de datos");
    }
    
}
