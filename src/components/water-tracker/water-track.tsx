import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

interface WaterTrackerProps {
  metaDiaria: number;
  setMetaDiaria: (value: number) => void;
  consumoAtual: number;
  setConsumoAtual: (value: number) => void;
}

const somenteNumeros = (texto: string) => {
  return texto.replace(/[^0-9]/g, "");
};

const somenteNumerosDecimais = (texto: string) => {
  let novoTexto = texto.replace(/[^0-9.,]/g, "");
  const primeiraVirgula = novoTexto.indexOf(",");
  const primeiraPonto = novoTexto.indexOf(".");

  if (primeiraVirgula !== -1) {
    novoTexto =
      novoTexto.slice(0, primeiraVirgula + 1) +
      novoTexto.slice(primeiraVirgula + 1).replace(/,/g, "");
  }

  if (primeiraPonto !== -1) {
    novoTexto =
      novoTexto.slice(0, primeiraPonto + 1) +
      novoTexto.slice(primeiraPonto + 1).replace(/\./g, "");
  }

  return novoTexto;
};

export function WaterTracker({
  metaDiaria,
  setMetaDiaria,
  consumoAtual,
  setConsumoAtual,
}: WaterTrackerProps) {
  const opcoesVolumes = [
    { id: 100, label: "100ml" },
    { id: 200, label: "200ml" },
    { id: 500, label: "500ml" },
    { id: -1, label: "Customizar" },
  ];

  const [volumeSelecionado, setVolumeSelecionado] = useState(100);
  const [volumeCustomizado, setVolumeCustomizado] = useState("");
  const [metaLitros, setMetaLitros] = useState((metaDiaria / 1000).toString());

  const registrarConsumo = () => {
    let volumeParaAdicionar = 0;
    if (volumeSelecionado === -1) {
      const parsed = parseInt(volumeCustomizado);
      if (isNaN(parsed) || parsed <= 0) {
        alert("Digite um valor válido para o volume customizado!");
        return;
      }
      volumeParaAdicionar = parsed;
    } else {
      volumeParaAdicionar = volumeSelecionado;
    }
    setConsumoAtual(consumoAtual + volumeParaAdicionar);
    setVolumeCustomizado("");
    setVolumeSelecionado(100);
  };

  const atualizarMetaLitros = (text: string) => {
    const filtrado = somenteNumerosDecimais(text);
    setMetaLitros(filtrado);

    const valorNum = parseFloat(filtrado.replace(",", "."));
    if (!isNaN(valorNum) && valorNum > 0) {
      setMetaDiaria(Math.round(valorNum * 1000));
    }
  };

  const atualizarVolumeCustomizado = (text: string) => {
    const filtrado = somenteNumeros(text);
    setVolumeCustomizado(filtrado);
  };

  return (
    <View className="bg-white p-4 rounded-xl shadow mt-4">
      <Text className="text-lg font-semibold mb-2">
        Meta diária (em litros)
      </Text>
      <TextInput
        placeholder="Ex: 2"
        keyboardType="numeric"
        value={metaLitros}
        onChangeText={atualizarMetaLitros}
        className="border border-gray-400 p-2 rounded mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Registrar consumo</Text>

      <Picker
        selectedValue={volumeSelecionado}
        onValueChange={(itemValue) => setVolumeSelecionado(itemValue)}
        className="mb-4"
      >
        {opcoesVolumes.map((op) => (
          <Picker.Item key={op.id} label={op.label} value={op.id} />
        ))}
      </Picker>

      {volumeSelecionado === -1 && (
        <TextInput
          placeholder="Digite o volume em ml"
          keyboardType="numeric"
          value={volumeCustomizado}
          onChangeText={atualizarVolumeCustomizado}
          className="border border-gray-400 p-2 rounded mb-4"
        />
      )}

      <Button title="Registrar consumo" onPress={registrarConsumo} />
    </View>
  );
}
