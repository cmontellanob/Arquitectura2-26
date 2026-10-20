/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.com350.open.close.bien;

import java.math.BigDecimal;

/**
 *
 * @author Dell
 */
public class DescuentoDocente implements IPoliticaDescuento{

    @Override
    public boolean aplicaA(Cliente cliente) {
        return true;
    }

    @Override
    public BigDecimal descontar(BigDecimal total) {
        return total.multiply(new BigDecimal("0.90"));
    }
    
}
