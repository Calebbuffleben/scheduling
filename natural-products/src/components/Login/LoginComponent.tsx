import { ChangeEvent, FormEvent } from 'react';
import { 
  Container, 
  Form, 
  Input, 
  Button, 
} from './style';

type TLogin = {
  onChangeValues: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (event: FormEvent<HTMLFormElement>) => void;
  email: string;
  password: string;
};

const LoginComponent = ({ 
  onChangeValues, 
  handleLogin, 
  email, 
  password 
}: TLogin) => (
  <Container>
    <Form onSubmit={handleLogin}>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={onChangeValues}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChangeValues}
      />
      <Button type="submit">Login</Button>
    </Form>
  </Container>
);

export default LoginComponent;
