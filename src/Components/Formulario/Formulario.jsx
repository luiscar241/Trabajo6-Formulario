import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button,Checkbox, 
    Flex, FormControl, Heading, Link, Modal, ModalBody, ModalCloseButton, ModalContent, 
    ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import {motion} from 'framer-motion';
import {Formik} from 'formik';
import { ref, object, string, boolean} from 'yup';
import { CustomFormControl } from "../CustomFormControl/CustomFormControl";
import { CustomFormControlPass } from "../CustomFormControlPass/CustomFormControlPass";
import { useState } from "react";

const Lorem = ({count}) => {
return (
<>
{[...Array(count)].map((c,i) => 
<Box mt={4}>
<Heading size='sm'>{i+1} - Lorem ipsum dolor sit amet</Heading>
<Text fontSize='sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In minima tenetur ex facere numquam vel. Odio hic molestiae aperiam expedita, dolorem perferendis, quo non facilis officiis optio, accusamus laborum quibusdam?</Text>
</Box>)}

</>
)
}
const TerminosModal = ({isOpen,onClose}) => {

return (

<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}
    isCentered scrollBehavior='inside' motionPreset='scale'>
<ModalOverlay />
  <ModalContent>
    <ModalHeader pb={0}>Términos y condiciones leer y aceptar</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Lorem count={6} />
    </ModalBody>

    <ModalFooter>
    <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
        <Button bg='#112132' color='#aaccee' onClick={onClose}
                _hover={{ bg:'#aaccee', color:'#112132'}}
                >Cerrar</Button>

      </motion.div>
    </ModalFooter>
  </ModalContent>
</Modal>
)
}

const Formulario = () => {

const toast = useToast();


const formInitialValues = {
nombre:'',
apellido:'',
email:'',
tel:'',
pass:'',
confPass:'',
toc:false
}

const {isOpen,onOpen,onClose} = useDisclosure();
const [submitted,setSubmitted] = useState(false)

const formSubmit = (values, {setSubmitting,resetForm}) => {
setTimeout(() => {
values.email = values.email.toLowerCase();
console.log(values);
setSubmitted(false);

toast({
  position: 'top',
  duration: null,
  render: () => (
    <motion.div 
        initial={{scale: 0.8}} 
        transition={{type: 'spring',damping: 8}} 
        animate={{scale:1}}
        >
      <Alert status='success' variant='subtle' flexDirection='column' alignItems='center'
            justifyContent='center' textAlign='center' rounded='md'>
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          Registro completado
        </AlertTitle>
        <AlertDescription maxWidth='md'>
          <Text>
            <Text as='strong'>{values.nombre}</Text> le hemos enviado un email a <Text as='strong'>{values.email}</Text> 
          </Text>  
          <Heading fontSize='md' mt={3}>IMPORTANTE</Heading>
        </AlertDescription>
        <Flex mt={2}>
          <Button colorScheme="green" onClick={() => {
              setSubmitting(false);
              toast.closeAll();
              resetForm({values:formInitialValues})
              setSubmitted(true);
            }}>Aceptar</Button>

        </Flex>
      </Alert>
    </motion.div>
  ),
})
}, 400);
}


const passPattern = /^(?=.*[a-zA-Z])(?=.*\d)\S+$/;
const emailBasicPattern = /^[a-zA-Z0-9][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const registroSchema = object({
nombre: string().trim()
      .matches(/^[a-zA-Z]{2,}/,'Por favor ingrese solo letras (al menos 2)')
      .required('Por favor ingrese su nombre'),
apellido: string().trim()
      .matches(/^[a-zA-Z]{2,}/,'Por favor ingrese solo letras (al menos 2)')
      .required('Por favor ingrese su apellido'),
email: string().trim().lowercase()
      .matches(emailBasicPattern,'Por favor ingrese un correo valido')
      .required('Por favor ingrese su correo'),
tel: string().trim()
      .matches(/^\d{10}$/,'Ingrese código sin 0 y número sin 15')
      .required('Por favor ingrese su teléfono'),
pass: string()
      .matches(passPattern,'Por favor ingrese al menos una letra y un número')
      .min(8,'Por favor ingrese al menos 8 caracteres')
      .required('Por favor ingrese una contraseña'),
confPass: string()
      .oneOf([ref('pass')],'Las contraseñas son distintas')
      .required('Por favor ingrese nuevamente la contraseña'),
toc: boolean()
      .oneOf([true], "Debe leer y aceptar los términos y condiciones")
})

return(
<>
<Formik initialValues={formInitialValues}
        validationSchema={registroSchema}
        onSubmit={formSubmit}>
  
  {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
    <form onSubmit={handleSubmit} noValidate>

      <CustomFormControl error={errors.nombre} touched={touched.nombre} 
                        label='NOMBRE' type='text' name='nombre'
                        placeholder='Ingrese su nombre' handleChange={handleChange}
                        handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.nombre}/>

      <CustomFormControl error={errors.apellido} touched={touched.apellido} 
                        label='APELLIDO' type='text' name='apellido'
                        placeholder='Ingrese su apellido' handleChange={handleChange}
                        handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.apellido}/>

      <CustomFormControl error={errors.email} touched={touched.email} 
                        label='CORREO' type='email' name='email'
                        placeholder='Ingrese su correo' handleChange={handleChange}
                        handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.email}/>

      <CustomFormControl error={errors.tel} touched={touched.tel} 
                        label='TELEFONO' type='tel' name='tel'
                        placeholder='Ingrese su teléfono' handleChange={handleChange}
                        handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.tel}/>

      <CustomFormControlPass error={errors.pass} touched={touched.pass} 
                            label='CONTRASEÑA' name='pass' submitted={submitted}
                            placeholder='Ingrese una contraseña' handleChange={handleChange}
                            handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.pass}/>

      <CustomFormControlPass error={errors.confPass} touched={touched.confPass} 
                            label='Confirmar contraseña' name='confPass' submitted={submitted}
                            placeholder='Ingrese nuevamente la contraseña' handleChange={handleChange}
                            handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.confPass}/>

      <FormControl isInvalid={errors.toc && touched.toc} display='flex' alignItems='center' gap={3}  mb={6}>
        <Checkbox name="toc" onChange={handleChange} value={values.toc} isChecked={values.toc} isDisabled={isSubmitting}></Checkbox>
        <Text>
          He leído y acepto los <Link _hover={{textDecoration:'none',color:'#112132'}} textDecoration='none' onClick={(!isSubmitting) ? onOpen : null} color='#768798' as='a'>términos y condiciones</Link>
          </Text>
      </FormControl>

      <Box display='flex' justifyContent='center'>
        <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
          <Button type='submit' isLoading={isSubmitting} size='lg' 
                  bg='#112132' color='#aaccee'
                  _hover={{ bg:'#aaccee', color:'#dc3545'}}
                  loadingText='Procesando'>Crear Perfil</Button>

        </motion.div>
      </Box>

    </form>
  )}
</Formik>

<TerminosModal isOpen={isOpen} onClose={onClose} />

</>
)
}

export { Formulario }