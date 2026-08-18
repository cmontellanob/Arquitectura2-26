/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.com350.open.close;

import java.math.BigDecimal;

/**
 *
 * @author Dell
 */
public class CalculadoraDescuento {

 
    public BigDecimal aplicar(Pedido pedido,
                              String tipoCliente) {
        BigDecimal total = pedido.total();
 
        if ("ESTUDIANTE".equals(tipoCliente)) {
            return total.multiply(new BigDecimal("0.80"));
        } else if ("DOCENTE".equals(tipoCliente)) {
            return total.multiply(new BigDecimal("0.90"));
        } else if ("EMPLEADO".equals(tipoCliente)) {
            return total.multiply(new BigDecimal("0.85"));
        }
        return total;
    }

 
// Cada nuevo convenio (egresados, convenio
// interinstitucional, promoción de aniversario...)
// obliga a EDITAR esta clase, recompilarla y
// volver a probar TODOS los casos anteriores
}
