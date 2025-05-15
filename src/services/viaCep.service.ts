import axios from "axios";
import { ViaCepResponse } from "../Interface/viaCep.interface";

const VIA_CEP_BASE_URL = "https://viacep.com.br/ws";

export const fetchAddressByCep = async (cep: string): Promise<ViaCepResponse | null> => {
  const numericCep = cep.replace(/\D/g, "");

  if (numericCep.length !== 8) {
    console.error("CEP inválido. Deve conter 8 dígitos numéricos.");
    return null;
  }

  try {
    const response = await axios.get<ViaCepResponse>(`${VIA_CEP_BASE_URL}/${numericCep}/json/`);
    if (response.data.erro) {
      console.warn(`CEP não encontrado: ${cep}`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};