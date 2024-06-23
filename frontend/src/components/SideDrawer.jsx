import {
    VStack,
    Button,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Link,
} from "@chakra-ui/react"

import { FiMenu } from "react-icons/fi"
import React from "react"

export default function SideDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Button ref={btnRef} onClick={onOpen}>
                <FiMenu />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader></DrawerHeader>

                    <DrawerBody>
                        <VStack p={10} spacing="34px">
                            <Link fontSize="large">Home</Link>
                            <Link fontSize="large">Agendar</Link>
                            <Link fontSize="large">Meus Agendamentos</Link>
                            <Link fontSize="large">Consulta</Link>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
