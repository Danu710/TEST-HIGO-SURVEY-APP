import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Input,
} from "@chakra-ui/react";

function InputField({
  name,
  children,
  defaultValue,
  label,
  placeholder,
  register,
  type,
  errors,
  value,
  onChange,
  keyProp,
  min,
  max,
}) {
  return (
    <FormControl
      my={{ base: 2, sm: 2, md: 3, lg: 3 }}
      isInvalid={errors}
      key={keyProp}>
      <FormLabel
        htmlFor={name}
        mt={2}
        mb={1}
        fontSize={{ base: "sm", sm: "sm", md: "md", lg: "md" }}
        fontWeight={"normal"}
        color="#06283D">
        {label}
      </FormLabel>
      <InputGroup h={{ base: "8", sm: "9", md: "auto", lg: "auto" }} mb={1}>
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          variant="unstyled"
          outline="1px solid"
          outlineColor="gray.300"
          h="auto"
          borderRadius="lg"
          autoComplete="off"
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          fontSize={{ base: "xs", sm: "sm", md: "sm", lg: "md" }}
          _focus={{
            border: "none",
            outline: "2px solid",
            outlineColor: "#1363DE",
          }}
          _invalid={{
            border: "none",
            outline: "2px solid",
            outlineColor: "#df1111",
          }}
          paddingBlock={2}
          paddingInline={3}
          {...register}
          min={min}
          max={max}
        />
        {children}
      </InputGroup>
      <FormErrorMessage fontSize="10px" fontWeight="semibold" ml={1} mt={1}>
        {errors && errors.message}
      </FormErrorMessage>
    </FormControl>
  );
}

export default InputField;
