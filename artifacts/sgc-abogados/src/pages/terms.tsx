import { LegalLayout, H2, P, UL, LI } from "@/components/legal-layout";

const BLUE = "#C4A355";

export default function TermsPage() {
  return (
    <LegalLayout title="Términos y Condiciones" lastUpdated="1 de junio de 2026">
      <P center>
        El acceso y uso del sitio web de SGC Abogados implica la aceptación plena de
        los presentes Términos y Condiciones. Le rogamos que los lea detenidamente antes
        de continuar navegando.
      </P>

      <H2>Titularidad del sitio</H2>
      <P>
        Este sitio web es propiedad de SGC Abogados, con domicilio en Cl 12 B 8-23,
        Oficina 421, Bogotá, Colombia. Para consultas, contáctenos en{" "}
        <a href="mailto:contacto@sgabogados.co" style={{ color: BLUE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
          contacto@sgabogados.co
        </a>.
      </P>

      <H2>Objeto del sitio</H2>
      <P>
        El presente sitio tiene como finalidad informar sobre los servicios jurídicos
        prestados por SGC Abogados y facilitar el contacto con nuestro equipo. El
        contenido publicado tiene carácter meramente informativo y no constituye asesoría
        legal.
      </P>

      <H2>Uso aceptable</H2>
      <P>Al utilizar este sitio, usted se compromete a:</P>
      <UL>
        <LI>Hacer un uso lícito y de buena fe del sitio y de sus contenidos.</LI>
        <LI>No reproducir, distribuir ni modificar los contenidos sin autorización expresa.</LI>
        <LI>No realizar acciones que puedan dañar, deshabilitar o sobrecargar el sitio.</LI>
        <LI>No introducir virus, código malicioso ni cualquier otro elemento dañino.</LI>
      </UL>

      <H2>Propiedad intelectual</H2>
      <P>
        Todos los contenidos del sitio —incluyendo textos, imágenes, logotipos y diseño—
        son propiedad de SGC Abogados o de sus respectivos titulares, y están protegidos
        por la legislación de propiedad intelectual aplicable en Colombia.
      </P>

      <H2>Exención de responsabilidad</H2>
      <P>
        SGC Abogados no garantiza la disponibilidad ininterrumpida del sitio ni la
        ausencia de errores en su contenido. La firma no será responsable de daños
        derivados del uso o imposibilidad de uso del sitio web.
      </P>
      <P>
        Los enlaces a sitios externos son proporcionados únicamente como referencia.
        SGC Abogados no tiene control sobre dichos sitios y no asume responsabilidad
        por su contenido.
      </P>

      <H2>Ley aplicable y jurisdicción</H2>
      <P>
        Los presentes Términos y Condiciones se rigen por las leyes de la República de
        Colombia. Cualquier controversia será sometida a los tribunales competentes de
        la ciudad de Bogotá, D.C.
      </P>

      <H2>Modificaciones</H2>
      <P>
        SGC Abogados se reserva el derecho de modificar estos Términos y Condiciones en
        cualquier momento. Las modificaciones entrarán en vigor desde su publicación en
        el sitio web.
      </P>
    </LegalLayout>
  );
}
