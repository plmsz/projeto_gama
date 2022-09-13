import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem, Select, Stack, Switch } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import toast from '../../components/Toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { postUser } from '../../services/usersRequests';
import useForm from '../../hooks/useForm';

const theme = createTheme();

export default function Cadastro() {
    const [checked, setChecked] = useState(false);
    const [inputCep, setInputCep] = useState({});
    const { user } = useAuth()
    const [datee, setDate] = React.useState(dayjs().format('L'));

    const { inputForm, onChangeInput, clear } = useForm({
        nome: "",
        sobrenome: "",
        genero: "",
        cpf: "",
        rg: "",
        crm: "",
        especialidade: "",
        cep: "",
        num: ""
    });

    const getCep = () => {
        if (inputForm.cep.length > 7) {
            axios.get(
                `https://viacep.com.br/ws/${inputForm.cep}/json/`,
            )
                .then((res) => {
                    setInputCep(res.data)
                })
                .catch((error) => {
                    toast.messageError('Erro verifique o CEP!')
                    setInputCep({})
                });
        }
    }

    useEffect(() => {
        getCep()
    }, [inputForm.cep]);

    function isValidCPF(cpf) {
        if (typeof cpf !== 'string') return false
        cpf = cpf.replace(/[^\d]+/g, '')
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
        cpf = cpf.split('').map(el => +el)
        const rest = (count) => (cpf.slice(0, count - 12)
            .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10
        return rest(10) === cpf[9] && rest(11) === cpf[10]
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const toastMessage = () => {
        isValidCPF(inputForm.cpf) === true ? toast.messageSuccess('Usuario cadastrado com sucesso!')
            : toast.messageError('Erro ao cadastrar, verifique as informações!')
    };

    const handleChangeDate = (newDate) => {
        setDate(newDate.format('L'));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        toastMessage()

        if (isValidCPF(inputForm.cpf) === true) {
            // const formData = new FormData(event.target);
            // const data = Object.fromEntries(formData);
            const body = {
                // id: Date.now(),
                id: '',
                userId: user.userId,
                role: user.role,
                name: user.name,
                dtnascto: datee,
                email: user.email,
                endereco: inputCep.logradouro,
                estado: inputCep.uf,
                cidade: inputCep.localidade,
                inputForm: inputForm
            }
            // console.log('formn', body)
            postUser('/users', body)

            setChecked(false)
            setInputCep({})
            clear();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="100%">
                <CssBaseline />
                <Box sx={{marginTop: 4,display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="h1" variant="h4">
                        Cadastre suas informações pessoais
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    autoComplete="given-name"
                                    name="nome"
                                    required
                                    fullWidth
                                    id="nome"
                                    label="Nome"
                                    autoFocus
                                    value={inputForm.nome}
                                    onChange={onChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    required
                                    fullWidth
                                    id="sobrenome"
                                    label="Sobrenome"
                                    name="sobrenome"
                                    autoComplete="family-name"
                                    value={inputForm.sobrenome}
                                    onChange={onChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Select sx={{ width: '100%' }}
                                    name="genero"
                                    onChange={onChangeInput}
                                    value={inputForm.genero}
                                    label="Gênero"
                                >
                                    <MenuItem value="" disabled>Selecione seu gênero</MenuItem>
                                    <MenuItem value='feminino'>Feminino</MenuItem>
                                    <MenuItem value='masculino'>Masculino</MenuItem>
                                    <MenuItem value='outro'>Outro</MenuItem>
                                    <MenuItem value='prefiro-nao-dizer'>Prefiro não dizer</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cpf"
                                    label="CPF"
                                    name="cpf"
                                    value={inputForm.cpf}
                                    onChange={onChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    required
                                    fullWidth
                                    id="rg"
                                    label="RG"
                                    name="rg"
                                    value={inputForm.rg}
                                    onChange={onChangeInput}
                                // ref = { register ({ pattern: (^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)  }) }

                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="Data de nascimento"
                                            inputFormat="DD/MM/YYYY"
                                            value={datee}
                                            onChange={handleChangeDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    disabled
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={user?.email || inputForm.email || ""}
                                    onChange={onChangeInput}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={12} sm={3}>
                                <FormControlLabel
                                    control={<Switch checked={checked} onChange={handleChange} />}
                                    label="Sou profissional de saúde mental"
                                />
                            </Grid>
                            {checked ?
                                <Grid item xs={12} sm={8} sx={{ display: 'flex' }}>
                                    <TextField
                                        sx={{ marginRight: 2 }}
                                        required
                                        fullWidth
                                        id="crm"
                                        label="CRM / CRP"
                                        name="crm"
                                        value={inputForm.crm}
                                        onChange={onChangeInput}
                                    />
                                    <Select sx={{ width: '100%' }}
                                        labelId="label-especialidade"
                                        name='especialidade'
                                        value={inputForm.especialidade}
                                        onChange={onChangeInput}
                                    >
                                        <MenuItem value='' disabled selected>Escolha sua especialidade</MenuItem>
                                        <MenuItem value='psicanalista'>Psicanalista</MenuItem>
                                        <MenuItem value='psiquiatra'>Psiquiatra</MenuItem>
                                        <MenuItem value='psicologo'>Psicólogo</MenuItem>
                                        <MenuItem value='terapeuta'>Terapeuta</MenuItem>
                                    </Select>
                                </Grid>
                                : null
                            }
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="cep"
                                    required
                                    fullWidth
                                    id="cep"
                                    label="CEP"
                                    value={inputForm.cep}
                                    onChange={onChangeInput}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    required
                                    fullWidth
                                    id="endereco"
                                    label="Endereco"
                                    name="endereco"
                                    value={inputCep.logradouro || ""}
                                    onChange={onChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    required
                                    fullWidth
                                    id="num"
                                    label="Numero"
                                    name="num"
                                    value={inputForm.num}
                                    onChange={onChangeInput}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    required
                                    fullWidth
                                    id="estado"
                                    label="Estado"
                                    name="estado"
                                    value={inputCep.uf || ""}
                                    onChange={onChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cidade"
                                    label="Cidade"
                                    name="cidade"
                                    value={inputCep.localidade || ""}
                                    onChange={onChangeInput}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 1 }}>
                            Registrar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

}