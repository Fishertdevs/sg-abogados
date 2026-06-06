import { LegalLayout, H2, P, UL, LI } from "@/components/legal-layout";

const BLUE = "#1e56b4";

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de Cookies" lastUpdated="1 de junio de 2026">
      <P>
        En SGC Abogados utilizamos cookies para garantizar el correcto funcionamiento
        de nuestro sitio web y para mejorar su experiencia de navegación. Esta política
        explica qué son las cookies, qué tipos utilizamos y cómo puede gestionarlas.
      </P>

      <H2>¿Qué son las cookies?</H2>
      <P>
        Las cookies son pequeños archivos de texto que se almacenan en su dispositivo
        cuando visita un sitio web. Permiten que el sitio recuerde sus preferencias y
        acciones anteriores, facilitando así una experiencia más personalizada en visitas
        posteriores.
      </P>

      <H2>Tipos de cookies que utilizamos</H2>
      <UL>
        <LI>
          <strong>Cookies técnicas o esenciales:</strong> Son estrictamente necesarias
          para el funcionamiento del sitio. Sin ellas, algunas funciones no estarían
          disponibles. No requieren su consentimiento.
        </LI>
        <LI>
          <strong>Cookies de preferencias:</strong> Nos permiten recordar sus elecciones
          —como si ha aceptado esta política— para ofrecerle una experiencia coherente.
        </LI>
        <LI>
          <strong>Cookies analíticas:</strong> Nos ayudan a comprender, de forma anónima
          y agregada, cómo los usuarios interactúan con el sitio, con el fin de mejorar
          su contenido y rendimiento.
        </LI>
      </UL>

      <H2>Duración de las cookies</H2>
      <P>
        Las cookies pueden ser de sesión (se eliminan al cerrar el navegador) o
        persistentes (permanecen en su dispositivo durante un período determinado o
        hasta que las elimine manualmente).
      </P>

      <H2>Gestión y desactivación</H2>
      <P>
        Puede configurar su navegador para rechazar todas las cookies, aceptar solo
        determinadas categorías o ser notificado cuando se envíe una cookie. Tenga en
        cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
      </P>
      <P>
        Para más información sobre cómo gestionar cookies, consulte la sección de ayuda
        de su navegador.
      </P>

      <H2>Cambios en esta política</H2>
      <P>
        Nos reservamos el derecho de actualizar esta Política de Cookies en cualquier
        momento. Le notificaremos de cambios significativos mediante un aviso visible en
        el sitio web.
      </P>

      <H2>Contacto</H2>
      <P>
        Si tiene preguntas sobre el uso de cookies en nuestro sitio, contáctenos en{" "}
        <a href="mailto:contacto@sgabogados.co" style={{ color: BLUE, textDecoration: "underline", textUnderlineOffset: "3px" }}>
          contacto@sgabogados.co
        </a>.
      </P>
    </LegalLayout>
  );
}
