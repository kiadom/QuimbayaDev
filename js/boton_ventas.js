function ingresarPedido(){
  
  let venta_id = document.getElementById('venta_id').value;
  let venta_total = document.getElementById('venta_total').value;
  let detalle = document.getElementById('detalle').value;
  let fecha_de_pago = document.getElementById('fecha_de_pago').value;
  let fecha_de_pago_futura = document.getElementById('fecha_de_pago_futura').value;
  let responsable = document.getElementById('responsable').value;

  alert("Pedido ingresado satisfactoriamente");

  let pedido = [venta_id, venta_total, detalle, fecha_de_pago, fecha_de_pago_futura, responsable];
  console.log(pedido)
}