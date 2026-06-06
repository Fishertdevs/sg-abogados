import { LegalLayout, H2, P, UL, LI } from "@/components/legal-layout";

const BLUE = "#1a3d7c";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Política de Privacidad" lastUpdated="1 de junio de 2026">
      <P>
        En SGC Abogados respetamos su privacidad y nos comprometemos a proteger sus
        datos personales. Esta política describe qué información recopilamos, cómo la
        usamos y cuáles son sus derechos como titular de los datos.
      </P>

      <H2>Responsable del tratamiento</H2>
      <P>
        SGC Abogados, con domicilio en Cl 12 B 8-23, Oficina 421, Bogotá, Colombia.
        Puede contactarnos en{" "}
        <a href="mailto:contacto@sgabogados.co" style={{ color: BLUE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
          contacto@sgabogados.co
        </a>.
      </P>

      <H2>Datos que recopilamos</H2>
      <UL>
        <LI><strong>Datos de contacto:</strong> nombre, correo electrónico y número de teléfono que nos proporcione voluntariamente a través de formularios o comunicaciones directas.</LI>
        <LI><strong>Datos de navegación:</strong> información técnica sobre su visita (dirección IP, tipo de navegador, páginas visitadas) recopilada mediante cookies.</LI>
        <LI><strong>Datos de consulta:</strong> información que comparta al solicitar asesoría jurídica, tratada con estricta confidencialidad profesional.</LI>
      </UL>

      <H2>Finalidad del tratamiento</H2>
      <UL>
        <LI>Responder a sus consultas y gestionar la relación cliente-abogado.</LI>
        <LI>Mejorar el funcionamiento y contenido de nuestro sitio web.</LI>
        <LI>Cumplir con obligaciones legales y reglamentarias aplicables.</LI>
      </UL>

      <H2>Base legal</H2>
      <P>
        El tratamiento de sus datos se basa en su consentimiento, en la ejecución de
        un contrato de servicios jurídicos, o en el cumplimiento de obligaciones legales,
        según corresponda en cada caso.
      </P>

      <H2>Conservación de los datos</H2>
      <P>
        Sus datos serán conservados durante el tiempo necesario para cumplir la
        finalidad para la que fueron recopilados y, en todo caso, durante los plazos
        legalmente establecidos.
      </P>

      <H2>Sus derechos</H2>
      <P>
        De conformidad con la Ley 1581 de 2012 y demás normativa aplicable en Colombia,
        usted tiene derecho a:
      </P>
      <UL>
        <LI>Acceder a sus datos personales.</LI>
        <LI>Solicitar la rectificación de datos inexactos.</LI>
        <LI>Solicitar la supresión de sus datos.</LI>
        <LI>Revocar su consentimiento en cualquier momento.</LI>
        <LI>Presentar una queja ante la Superintendencia de Industria y Comercio.</LI>
      </UL>
      <P>
        Para ejercer estos derechos, escríbanos a{" "}
        <a href="mailto:contacto@sgabogados.co" style={{ color: BLUE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
          contacto@sgabogados.co
        </a>.
      </P>

      <H2>Seguridad</H2>
      <P>
        Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos
        personales frente a accesos no autorizados, pérdida o divulgación indebida.
      </P>

      <H2>Actualizaciones</H2>
      <P>
        Podemos modificar esta política periódicamente. Le informaremos de cambios
        relevantes a través de un aviso en el sitio web. El uso continuado del sitio
        implica la aceptación de la política vigente.
      </P>
    </LegalLayout>
  );
}
