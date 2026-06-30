<!-- @format -->

<template>
  <div class="about-container">
    <div class="about-header">
      <h2 class="about-title">
        <i class="bi bi-heart" />
        Nossa História
      </h2>
      <p class="about-subtitle">Conheça a história da Cupcake Store</p>
    </div>

    <div class="about-content">
      <!-- Imagem -->
      <div class="about-image-wrapper">
        <img src="../images/fachada.png" alt="Fachada da Cupcake Store" class="about-image" />
      </div>

      <!-- Texto -->
      <div class="about-text">
        <div class="text-block">
          <h3 class="block-title">O Começo</h3>
          <p>
            Em uma charmosa ruazinha de paralelepípedos, cercada por jardins floridos e um aroma
            irresistível de baunilha e canela, nasceu a Cupcake Store. O pequeno estabelecimento,
            com sua fachada em tons pastéis e uma vitrine repleta de doces coloridos, foi o sonho
            realizado de Clara, uma apaixonada confeiteira que sempre acreditou que um simples
            cupcake poderia transformar o dia de alguém.
          </p>
        </div>

        <div class="text-block">
          <h3 class="block-title">As Receitas de Família</h3>
          <p>
            Com receitas que herdou de sua avó e um toque especial de criatividade, ela começou a
            conquistar clientes não apenas pelo sabor, mas também pelo carinho que colocava em cada
            detalhe. Os moradores logo se afeiçoaram à lojinha, tornando-se fregueses fiéis. Cada
            cupcake tinha uma história: o de frutas vermelhas era inspirado nos piqueniques de
            infância de Clara, enquanto o de chocolate com caramelo remetia às tardes chuvosas em
            que ela e sua avó assavam bolinhos para aquecer a casa.
          </p>
        </div>

        <div class="text-block">
          <h3 class="block-title">Crescimento e Comunidade</h3>
          <p>
            Além dos sabores clássicos, a Cupcake Store surpreendia com criações sazonais,
            decoradas com flores comestíveis, confeitos brilhantes e até versões personalizadas
            para aniversários e casamentos. Mais do que uma confeitaria, o espaço se tornou um
            ponto de encontro para amigos, famílias e apaixonados por doces. Com o tempo, a fama
            da lojinha cresceu e Clara passou a realizar oficinas para ensinar crianças e adultos
            a fazerem seus próprios cupcakes.
          </p>
        </div>

        <div class="text-block">
          <h3 class="block-title">Um Refúgio de Doçura</h3>
          <p>
            Entre risadas, farinha espalhada pelo avental e o perfume de massa assando no forno, a
            Cupcake Store se transformou em um verdadeiro refúgio de felicidade. E assim, com cada
            fornada quentinha saindo do forno, Clara continuava a espalhar doçura pelo mundo, uma
            mordida mágica de cada vez.
          </p>
        </div>
      </div>
    </div>

    <!-- Valores -->
    <div class="values-section">
      <h3 class="section-title">Nossos Valores</h3>
      <div class="values-grid">
        <div class="value-card">
          <i class="bi bi-heart-fill" />
          <h4>Feito com Amor</h4>
          <p>Cada cupcake é preparado com dedicação e carinho</p>
        </div>
        <div class="value-card">
          <i class="bi bi-star-fill" />
          <h4>Qualidade Premium</h4>
          <p>Ingredientes selecionados para o melhor sabor</p>
        </div>
        <div class="value-card">
          <i class="bi bi-people-fill" />
          <h4>Comunidade</h4>
          <p>Criamos momentos especiais juntos</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 1rem;
}

.about-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.about-title i {
  font-size: 2rem;
  animation: pulse-glow 2s ease-in-out infinite;
}

.about-subtitle {
  margin: 0.5rem 0 0 0;
  color: var(--color-text-light);
  font-size: 1rem;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.about-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-image {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(236, 72, 153, 0.2);
  transition: all 0.3s ease;
}

.about-image:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(236, 72, 153, 0.3);
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.text-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.block-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.text-block p {
  margin: 0;
  color: var(--color-text);
  line-height: 1.8;
  text-align: justify;
  font-size: 0.95rem;
}

/* Valores */
.values-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var(--color-primary-lighter) 0%, white 100%);
  border-radius: 1.5rem;
  border: 2px solid var(--color-primary-lighter);
}

.section-title {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.value-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  background: white;
  border-radius: 1rem;
  border: 2px solid var(--color-border);
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.value-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-primary);
  box-shadow: 0 15px 35px rgba(236, 72, 153, 0.2);
}

.value-card i {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.value-card:hover i {
  transform: scale(1.2) rotate(10deg);
}

.value-card h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 0.5rem 0;
}

.value-card p {
  margin: 0;
  color: var(--color-text-light);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Responsivo */
@media (max-width: 768px) {
  .about-container {
    gap: 2rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-title {
    font-size: 1.5rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .text-block p {
    text-align: left;
  }
}
</style>
