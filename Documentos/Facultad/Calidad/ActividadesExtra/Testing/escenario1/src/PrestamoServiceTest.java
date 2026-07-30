import org.mockito.Mockito;
import org.testng.annotations.Test;
import static org.mockito.Mockito.*;

public class PrestamoServiceTest {

    @Test
    public void procesarDevolucion_libroFueraPlazo_true(){
        //Arrange
            String s = "34";
            String email = "fulanito@gmail.com";
            //Simulo que existe el libro con stub lambda
            // y que esta fuera de plazo con stub clase
            Libro libro = new Libro();
            LibroRepository stub = (isbn) -> libro;

            //uso mock para poder verificar que envio el mensaje
            NotificadorService mock = Mockito.mock(NotificadorService.class);

            PrestamoService ps = new PrestamoService(stub,mock);

        // Act
            ps.procesarDevolucion(s, email);

        //Assert
            verify(mock, times(1)).enviarRecordatorio(email, "Devolución con demora");
    }
}
