/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.com350.sigletonpatterndemo;

/**
 *
 * @author Dell
 */
public class SigletonPatternDemo {

    public static void main(String[] args) {
        SingleObject objeto=SingleObject.getInstance();
        objeto.ShowMessage();
        objeto.setMensaje("Buenas Tardes");
        objeto.ShowMessage();
        SingleObject.getInstance().ShowMessage();
        SingleObject.getInstance().setMensaje("Buenas Noches");
        objeto.ShowMessage();
    }
}
