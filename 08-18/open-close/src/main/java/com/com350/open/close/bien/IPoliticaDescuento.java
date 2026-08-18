/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.com350.open.close.bien;

import java.math.BigDecimal;

/**
 *
 * @author Dell
 */
public interface IPoliticaDescuento {
    boolean aplicaA(Cliente cliente);
    BigDecimal descontar(BigDecimal total);
}

