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
import { Alert, MenuItem, Select, Snackbar, Stack, Switch } from '@mui/material';
import useFormCont from '../../hooks/useFormCont';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useSnackbar } from 'notistack';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const theme = createTheme();

export default function Cadastro() {
    const [checked, setChecked] = useState(false);
    const [inputCep, setInputCep] = useState({});
    const { enqueueSnackbar } = useSnackbar();

        
    const { form, inputChange, setForm, clear } = useFormCont({
        nome: "",
        sobrenome: "",
        genero: "",
        cpf: "",
        rg: "",
        dtnascto: "",
        email: "",
        crm: "",
        especialidade: "",
        cep: "",
        endereco: "",
        num: "",
        estado: "",
        cidade: ""
    });

    const getCep = () => {
        if (form.cep) {
            axios.get(
                `https://viacep.com.br/ws/${form.cep}/json/`,
            )
            .then((res) => {
                setInputCep(res.data)
            })
            .catch((error) => {
                console.log('Deu erro!!!', error.res)
            });
        }
    }

    useEffect(() => {
        getCep()
    }, [form.cep]);

    function isValidCPF(cpf) {
        if (typeof cpf !== 'string') return false
        cpf = cpf.replace(/[^\d]+/g, '')
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
        cpf = cpf.split('').map(el => +el)
        const rest = (count) => (cpf.slice(0, count-12)
            .reduce( (soma, el, index) => (soma + el * (count-index)), 0 )*10) % 11 % 10
        return rest(10) === cpf[9] && rest(11) === cpf[10]
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
      
    const handleClickVariant = (variant) => () => {
        // isValidCPF(form.cpf) === true ? enqueueSnackbar('Usuario cadastrado com sucesso!', { variant }) 
        // : enqueueSnackbar('Erro ao cadastrar, verifique as informações!', { variant })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
         
        if(isValidCPF(form.cpf) === true){
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            console.log('data', data)
            
            setChecked(false)
            setInputCep({})
            clear();
        }       
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="100%">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
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
                                    value={form.nome}
                                    onChange={inputChange}
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
                                    value={form.sobrenome}
                                    onChange={inputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                {/* <InputLabel id="demo-simple-select-label">Sexo</InputLabel> */}
                                <Select sx={{width: '100%'}}
                                    name="genero"
                                    onChange={inputChange}
                                    value={form.genero}
                                    defaultValue={{ label: "Choose one", value: "" }}
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
                                    value={form.cpf}
                                    onChange={inputChange}
                                    // type='text'
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    required
                                    fullWidth
                                    id="rg"
                                    label="RG"
                                    name="rg"
                                    value={form.rg}
                                    onChange={inputChange}
                                    // ref = { register ({ pattern: (^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)  }) }

                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                {/* <TextField
                                    required
                                    fullWidth
                                    id="dtnascto"
                                    label="Data de nascimento"
                                    name="dtnascto"
                                    value={form.dtnascto}
                                    onChange={inputChange}
                                /> */}
                                    <Stack >
                                    <TextField
                                        id="dtnascto"
                                        label="Data de nascimento"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        value={form.dtnascto || ''}
                                        onChange={inputChange}
                                    />
                                    </Stack>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={inputChange}
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
                                    value={form.crm}
                                    onChange={inputChange}
                                />
        
                                {/* <InputLabel id="label-especialidade">Escolha sua especialidade</InputLabel> */}
                                <Select sx={{width: '100%'}}
                                    labelId="label-especialidade"
                                    name='especialidade'
                                    value={form.especialidade}
                                    onChange={inputChange}
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
                                    value={form.cep}
                                    onChange={inputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    required
                                    fullWidth
                                    id="endereco"
                                    label="Endereco"
                                    name="endereco"
                                    value={inputCep.logradouro || ''}
                                    onChange={inputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    required
                                    fullWidth
                                    id="num"
                                    label="Numero"
                                    name="num"
                                    value={form.num}
                                    onChange={inputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    required
                                    fullWidth
                                    id="estado"
                                    label="Estado"
                                    name="estado"
                                    value={inputCep.uf || ''}
                                    onChange={inputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cidade"
                                    label="Cidade"
                                    name="cidade"
                                    value={inputCep.localidade || ''}
                                    onChange={inputChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                            onClick={isValidCPF(form.cpf) === true ? handleClickVariant('success') : handleClickVariant('error')}
                        >
                            Registrar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

}