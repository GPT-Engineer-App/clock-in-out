import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, Text, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";
import { FaClock, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [workEntries, setWorkEntries] = useState([]);
  const toast = useToast();

  const handleLogin = () => {
    // Simulated login logic
    if (username === "user" && password === "password") {
      setIsLoggedIn(true);
      toast({
        title: "Logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClockIn = () => {
    const currentTime = new Date();
    setClockInTime(currentTime);
    toast({
      title: "Clocked in",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleClockOut = () => {
    const currentTime = new Date();
    setClockOutTime(currentTime);

    const hours = calculateHours(clockInTime, currentTime);
    setTotalHours(totalHours + hours);

    const entry = {
      date: currentTime.toLocaleDateString(),
      clockIn: clockInTime.toLocaleTimeString(),
      clockOut: currentTime.toLocaleTimeString(),
      hours: hours,
    };
    setWorkEntries([...workEntries, entry]);

    setClockInTime(null);
    setClockOutTime(null);

    toast({
      title: "Clocked out",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const calculateHours = (startTime, endTime) => {
    const timeDiff = endTime.getTime() - startTime.getTime();
    return Math.round((timeDiff / 3600000) * 100) / 100;
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Time Card App
      </Heading>

      {!isLoggedIn ? (
        <Stack spacing={4} maxW="md" mx="auto">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      ) : (
        <>
          <Stack direction="row" spacing={4} mb={8} justifyContent="center">
            <Button leftIcon={<FaClock />} colorScheme="green" onClick={handleClockIn} isDisabled={clockInTime !== null}>
              Clock In
            </Button>
            <Button leftIcon={<FaClock />} colorScheme="red" onClick={handleClockOut} isDisabled={clockInTime === null}>
              Clock Out
            </Button>
          </Stack>

          <Box mb={8}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Total Hours: {totalHours}
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Work Entries
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Clock In</Th>
                  <Th>Clock Out</Th>
                  <Th isNumeric>Hours</Th>
                </Tr>
              </Thead>
              <Tbody>
                {workEntries.map((entry, index) => (
                  <Tr key={index}>
                    <Td>{entry.date}</Td>
                    <Td>{entry.clockIn}</Td>
                    <Td>{entry.clockOut}</Td>
                    <Td isNumeric>{entry.hours}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Index;
