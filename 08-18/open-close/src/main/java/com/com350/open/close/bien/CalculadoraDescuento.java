/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.com350.open.close.bien;

import java.math.BigDecimal;
import java.util.List;

/**
 *
 * @author Dell
 */
 

public class CalculadoraDescuento {
    
    private final List<IPoliticaDescuento> politicas = null;
 
    public BigDecimal aplicar(Pedido ped, Cliente c) {
        return politicas.stream()
                .filter(p -> p.aplicaA(c))
                .findFirst()
                .map(p -> p.descontar(ped.total()))
                .orElse(ped.total());
    }
}