import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FooterComponent = () => {
    return (
    <footer className='mt-5'>
        <Container fluid>
            <Row>
                <Col className='bg-dark text-white text-center py-5'>Copyright &copy; Best Online Shop</Col>
            </Row>
        </Container>
    </footer>
    )
}

export default FooterComponent