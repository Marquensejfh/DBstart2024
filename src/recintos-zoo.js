class RecintosZoo {

  analisaRecintos(animal, quantidade) {
    // Definição dos animais e seus requisitos
    const animais = {
        MACACO: { bioma: 'floresta', espacoNecessario: 2, carnivoro: false },
        LEAO: { bioma: 'savana', espacoNecessario: 4, carnivoro: true },
        HIPOPOTAMO: { bioma: 'savana', espacoNecessario: 5, carnivoro: false },
        GIRAFA: { bioma: 'savana', espacoNecessario: 3, carnivoro: false },
        ELEFANTE: { bioma: 'savana', espacoNecessario: 6, carnivoro: false },
        PINGUIM: { bioma: 'polar', espacoNecessario: 1, carnivoro: false },
      };
      
      // Definição dos recintos
      const recintos = [
        { numero: 1, bioma: 'floresta', espacoTotal: 10, animaisPresentes: [{ tipo: 'MACACO', quantidade: 1 }] },
        { numero: 2, bioma: 'savana', espacoTotal: 5, animaisPresentes: [] },
        { numero: 3, bioma: 'savana', espacoTotal: 7, animaisPresentes: [{ tipo: 'GIRAFA', quantidade: 1 }] },
        { numero: 4, bioma: 'polar', espacoTotal: 8, animaisPresentes: [{ tipo: 'PINGUIM', quantidade: 4 }] },
        { numero: 5, bioma: ['savana', 'rio'], espacoTotal: 15, animaisPresentes: [{ tipo: 'HIPOPOTAMO', quantidade: 1 }] },
      ];
      
      function encontrarRecintosViaveis(tipoAnimal, quantidade) {
        // Validar entrada
        if (!animais[tipoAnimal]) {
          return { erro: "Animal inválido" };
        }
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
          return { erro: "Quantidade inválida" };
        }
      
        const animal = animais[tipoAnimal];
        const recintosViaveis = [];
      
        for (const recinto of recintos) {
          if (recintoViavel(recinto, animal, quantidade)) {
            const espacoLivre = calcularEspacoLivre(recinto, animal, quantidade);
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.espacoTotal})`);
          }
        }
      
        if (recintosViaveis.length === 0) {
          return { erro: "Não há recinto viável" };
        }
      
        return { recintosViaveis };
      }
      
      function recintoViavel(recinto, animal, quantidade) {
        // Verificar bioma adequado
        if (Array.isArray(recinto.bioma)) {
          if (!recinto.bioma.includes(animal.bioma)) return false;
        } else if (recinto.bioma !== animal.bioma) {
          return false;
        }
      
        // Verificar espaço suficiente
        const espacoNecessario = animal.espacoNecessario * quantidade;
        const espacoOcupado = recinto.animaisPresentes.reduce((total, a) => total + animais[a.tipo].espacoNecessario * a.quantidade, 0);
        const espacoExtra = recinto.animaisPresentes.length > 0 ? 1 : 0;
        if (espacoOcupado + espacoNecessario + espacoExtra > recinto.espacoTotal) {
          return false;
        }
      
        // Verificar regras específicas
        // biome-ignore lint/style/useConst: <explanation>
        let tipoAnimal = ""; // Ou outro valor apropriado
    
        if (animal.carnivoro && recinto.animaisPresentes.length > 0) {
          return false;
        }
        if (tipoAnimal === 'HIPOPOTAMO' && (!Array.isArray(recinto.bioma) || !recinto.bioma.includes('rio'))) {
          return false;
        }
        if (tipoAnimal === 'MACACO' && recinto.animaisPresentes.length === 0 && quantidade === 1) {
          return false;
        }
      
        // Verificar se os animais presentes continuarão confortáveis
        for (const animalPresente of recinto.animaisPresentes) {
          if (animalPresente.tipo === 'HIPOPOTAMO' && tipoAnimal !== 'HIPOPOTAMO') {
            return false;
          }
        }
      
        return true;
      }
      
      function calcularEspacoLivre(recinto, animal, quantidade) {
        const espacoNecessario = animal.espacoNecessario * quantidade;
        const espacoOcupado = recinto.animaisPresentes.reduce((total, a) => total + animais[a.tipo].espacoNecessario * a.quantidade, 0);
        const espacoExtra = recinto.animaisPresentes.length > 0 ? 1 : 0;
        return recinto.espacoTotal - (espacoOcupado + espacoNecessario + espacoExtra);
      }
      
      // Exemplo de uso:
      // console.log( encontrarRecintosViaveis( "MACACO", 10 ) );
      // console.log( encontrarRecintosViaveis( "UNICORNIO", 1 ) );
      // console.log( encontrarRecintosViaveis( "ELEFANTE", 1 ) );
      // console.log( encontrarRecintosViaveis( "LEAO", 1 ) );
      // console.log( encontrarRecintosViaveis( "GIRAFA", 1 ) ); 
  }
}

export { RecintosZoo };