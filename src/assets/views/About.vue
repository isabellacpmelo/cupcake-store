<!-- @format -->

<template>
  <div class="about-container">
    <section class="about-hero">
      <div class="hero-copy">
        <p class="hero-kicker">Desde 2019</p>
        <h2 class="about-title">
          <i class="bi bi-heart" />
          Uma confeitaria que nasceu para criar momentos doces
        </h2>
        <p class="about-subtitle">
          Na Cupcake Store, cada fornada une receita de família, cuidado artesanal e sabor que
          acolhe.
        </p>

        <div class="hero-highlights">
          <div class="highlight-pill">
            <i class="bi bi-stars" />
            Produção artesanal diária
          </div>
          <div class="highlight-pill">
            <i class="bi bi-emoji-smile" />
            Clientes que voltam toda semana
          </div>
        </div>
      </div>

      <div class="hero-image-card">
        <img src="../images/fachada.png" alt="Fachada da Cupcake Store" class="about-image" />
        <div class="image-badge">
          <i class="bi bi-award" />
          Receita, afeto e qualidade
        </div>
      </div>
    </section>

    <section class="story-section">
      <h3 class="section-title">Nossa Jornada</h3>
      <div class="story-grid">
        <article class="story-card">
          <span class="story-step">01</span>
          <h4 class="block-title">O começo</h4>
          <p>Diana abriu uma pequena loja com o sonho de transformar dias comuns em dias especiais.</p>
        </article>

        <article class="story-card">
          <span class="story-step">02</span>
          <h4 class="block-title">Receitas de família</h4>
          <p>As receitas da avó ganharam releituras criativas, mantendo sabor caseiro e afeto.</p>
        </article>

        <article class="story-card">
          <span class="story-step">03</span>
          <h4 class="block-title">Comunidade</h4>
          <p>A loja virou ponto de encontro para celebrar aniversários, encontros e pequenas vitórias.</p>
        </article>

        <article class="story-card">
          <span class="story-step">04</span>
          <h4 class="block-title">Hoje</h4>
          <p>Seguimos criando cupcakes com qualidade premium, atendimento próximo e muito carinho.</p>
        </article>

      </div>
    </section>

    <section class="values-section">
      <h3 class="section-title">Nossos Valores</h3>
      <div class="values-grid">
        <article class="value-card">
          <div class="value-icon-wrap">
            <i class="bi bi-heart-fill" />
          </div>
          <h4>Feito com Amor</h4>
          <p>Cada cupcake recebe atenção em cada etapa.</p>
        </article>

        <article class="value-card">
          <div class="value-icon-wrap">
            <i class="bi bi-star-fill" />
          </div>
          <h4>Qualidade Premium</h4>
          <p>Ingredientes selecionados para sabor marcante.</p>
        </article>

        <article class="value-card">
          <div class="value-icon-wrap">
            <i class="bi bi-people-fill" />
          </div>
          <h4>Comunidade</h4>
          <p>Criamos experiências que aproximam pessoas.</p>
        </article>
      </div>
    </section>

    <section class="about-cta">
      <p class="cta-text">Pronto para escolher seu sabor favorito?</p>
      <p class="cta-subtext">Do clássico ao especial da casa, sempre fresquinho para você.</p>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  max-width: 980px;
  margin: 0 auto;
  padding: 0.5rem 0.25rem 2rem;
}

.about-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 1.6rem;
  padding: 1.3rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(236, 72, 153, 0.18);
  background:
    radial-gradient(circle at top right, rgba(236, 72, 153, 0.16), transparent 40%),
    linear-gradient(160deg, #fff7fc 0%, #ffffff 58%, #fff4fb 100%);
  box-shadow: 0 14px 30px rgba(190, 24, 93, 0.1);
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.hero-kicker {
  margin: 0;
  color: var(--color-primary-dark);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.about-title {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 800;
  color: var(--color-primary);
  margin: 0;
  line-height: 1.15;
}

.about-title i {
  font-size: 1.45rem;
  margin-top: 0.15rem;
}

.about-subtitle {
  margin: 0;
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 48ch;
}

.hero-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.highlight-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(236, 72, 153, 0.22);
  background: rgba(255, 255, 255, 0.72);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-primary-dark);
}

.hero-image-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  min-height: 280px;
  border: 1px solid rgba(236, 72, 153, 0.2);
  box-shadow: 0 20px 35px rgba(190, 24, 93, 0.14);
}

.about-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-badge {
  position: absolute;
  left: 0.8rem;
  bottom: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(236, 72, 153, 0.22);
  color: var(--color-primary-dark);
  font-size: 0.8rem;
  font-weight: 700;
}

.story-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  text-align: left;
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-primary);
  margin: 0;
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.story-card {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1rem;
  border-radius: 0.95rem;
  border: 1px solid rgba(236, 72, 153, 0.16);
  background: linear-gradient(155deg, #ffffff 0%, #fff7fc 100%);
  box-shadow: 0 8px 16px rgba(190, 24, 93, 0.08);
}

.story-step {
  display: inline-flex;
  width: fit-content;
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  background: var(--color-primary-lighter);
  color: var(--color-primary-dark);
  font-size: 0.72rem;
  font-weight: 700;
}

.block-title {
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0;
}

.story-card p {
  margin: 0;
  color: var(--color-text);
  line-height: 1.55;
  font-size: 0.92rem;
}

.values-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.4rem;
  background: linear-gradient(135deg, #fff5fb 0%, #ffffff 100%);
  border-radius: 1.1rem;
  border: 1px solid rgba(236, 72, 153, 0.18);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
}

.value-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 0.55rem;
  padding: 1rem;
  background: white;
  border-radius: 0.95rem;
  border: 1px solid rgba(236, 72, 153, 0.15);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.value-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(190, 24, 93, 0.13);
}

.value-icon-wrap {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(155deg, #ffe9f5 0%, #ffffff 100%);
  border: 1px solid rgba(236, 72, 153, 0.18);
}

.value-card i {
  font-size: 1rem;
  color: var(--color-primary);
}

.value-card h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0;
}

.value-card p {
  margin: 0;
  color: var(--color-text-light);
  font-size: 0.88rem;
  line-height: 1.5;
}

.about-cta {
  text-align: center;
  padding: 1.15rem 1rem;
  border-radius: 1rem;
  background: linear-gradient(130deg, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.03) 100%);
  border: 1px solid rgba(236, 72, 153, 0.2);
}

.cta-text {
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-primary-dark);
  font-weight: 700;
}

.cta-subtext {
  margin: 0.3rem 0 0;
  color: var(--color-text);
  font-size: 0.9rem;
}

@media (max-width: 992px) {
  .about-container {
    padding: 0.5rem 0.2rem 2rem;
  }

  .about-hero {
    grid-template-columns: 1fr;
  }

  .hero-image-card {
    min-height: 240px;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-container {
    gap: 1.5rem;
    padding: 0.5rem 0.65rem 2rem;
  }

  .about-hero {
    padding: 1rem;
    gap: 1rem;
  }

  .hero-highlights {
    flex-direction: column;
    align-items: flex-start;
  }

  .highlight-pill {
    width: 100%;
    justify-content: flex-start;
  }

  .story-grid {
    grid-template-columns: 1fr;
  }

  .values-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.2rem;
  }
}
</style>
