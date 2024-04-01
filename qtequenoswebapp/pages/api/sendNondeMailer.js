import nodemailer from "nodemailer";
import dotenv from "dotenv";
//import { getEnv } from 'vercel';

dotenv.config();
 
export default async function (req, res) {
    const { message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "qtequenoswebapp@outlook.com",
            pass: "bnjolnbcizconrfz"
        }
    });

    transporter.sendMail({

        from: 'qtequenoswebapp@outlook.com',
        to: 'qtequenoswebapp@outlook.com',
        //cc: 'alimentosnavi1801@gmail.com',
        subject: `Nuevo pedido`,
        text:'Información del pedido',
        html: `<html><body><p>Usuario : ${message.usuario} | Orden nº <strong>${message.detalleDeLaOrden.order}</strong></p><p><strong>Items :</strong> </p><p>${message.detalleDeLaOrden.productsAndQuantity}</p><p>Precio total del pedido: <strong>$${message.detalleDeLaOrden.totalPrice}</strong></p><p><strong>Información de despacho:</strong> </p><p>Dirección: ${message.detalleDeLaOrden.deliveryAddress}</p><p>Nombre de quien recibe: ${message.detalleDeLaOrden.recipientsName}</p><p><strong>Información de pago</strong></p><p> ${JSON.stringify(message.infoPago)}</p><p style="color:#bbbbbb">Mensaje enviado desde la web app qtequeños | No responder este mensaje</p></body></html>`,
    
    }).then(function(data) {
        res.status(200).json({ message: 'El correo se envio correctamente' }) 
      }, function(error) {
        console.error(error);
        res.status(400).json({ message: error }) ;
      });

}
