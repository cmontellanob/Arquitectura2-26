/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.com350.open.close.bien;

/**
 *
 * @author Dell
 */
public interface PoliticaDescuento {
    boolean aplicaA(Cliente cliente);
    BigDecimal descontar(BigDecimal total);
}
 
public class DescuentoEstudiante
        implements PoliticaDescuento {
    public boolean aplicaA(Cliente c) {
        return c.esEstudiante();
    }
    public BigDecimal descontar(BigDecimal total) {
        return total.multiply(new BigDecimal("0.80"));
    }
}
 
public class CalculadoraDescuento {
    private final List<PoliticaDescuento> politicas;
 
    public BigDecimal aplicar(Pedido ped, Cliente c) {
        return politicas.stream()
                .filter(p -> p.aplicaA(c))
                .findFirst()
                .map(p -> p.descontar(ped.total()))
                .orElse(ped.total());
    }
}