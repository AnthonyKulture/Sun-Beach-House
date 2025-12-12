import React, { useEffect } from 'react';
import { SunStamp, PalmLeaf, NorthStar, OrganicLine } from './Decorations';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-sbh-cream min-h-screen animate-fade-in pb-24 text-sbh-charcoal relative overflow-hidden">
      
      {/* HERO SECTION */}
      <div className="relative h-[60vh] w-full overflow-hidden mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://storage.googleapis.com/images-sbh/besoin-d-une-image-r-alistes-cin-matique-pour-la-s.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <h1 className="font-serif text-5xl md:text-8xl italic drop-shadow-xl">L'Esprit</h1>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-[80vh] left-0 w-full opacity-20 pointer-events-none text-sbh-green/30">
        <OrganicLine className="w-full h-auto" />
      </div>

      {/* INTRO & HISTORY SECTION - Split Layout */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32 items-start">
          
          {/* Left: Portrait Image */}
          <div className="md:col-span-5 relative md:sticky md:top-32">
              <div className="aspect-[3/4] overflow-hidden rounded-sm relative z-10 shadow-xl shadow-sbh-green/10">
                 <img 
                    src="https://images.unsplash.com/photo-1573599971936-8a79854743c6?q=80&w=1200&auto=format&fit=crop" 
                    alt="Valérie - Founder" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
                 />
                 <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-full h-full border border-sbh-charcoal/5 z-0 hidden md:block"></div>
          </div>

          {/* Right: Narrative Text */}
          <div className="md:col-span-7 space-y-12 font-sans font-light text-lg leading-relaxed text-sbh-charcoal/90 text-justify relative z-20">
              
              {/* Intro */}
              <div className="space-y-6">
                  <h2 className="font-serif text-3xl italic text-sbh-charcoal mb-8">
                      Sun Beach House.
                  </h2>
                  <p className="font-serif text-2xl italic text-sbh-charcoal">
                      Bienvenue. Je suis Valérie.
                  </p>
                  <p>
                      Et si vous êtes ici… ce n’est peut-être pas un hasard. Je ne suis pas seulement quelqu’un qui loue des villas à Saint-Barthélemy. Je suis quelqu’un qui connaît cette île par le cœur — pas seulement sur une carte.
                  </p>
              </div>

              {/* The Story */}
              <div className="space-y-6 relative">
                   <div className="absolute -left-8 top-0 text-sbh-green/20 -z-10 hidden md:block">
                        <NorthStar className="w-12 h-12" />
                   </div>
                  <p>
                      La première fois que j’ai posé le pied à Saint-Barth, c’était en 1993. J’étais jeune, libre, curieuse… et je suis tombée amoureuse de cette île avant même de comprendre pourquoi.
                  </p>
                  <p>
                      Ce n’était pas seulement la mer turquoise, les collines sauvages ou les couchers de soleil dorés. C’était autre chose. Une énergie. Une vibration unique, presque magnétique. C’est cette essence que je transmets aujourd’hui à travers <strong>Sun Beach House</strong>.
                  </p>
                  <p>
                      En 1996, j’ai posé mes valises ici. Pas en touriste — mais comme quelqu’un qui avait trouvé un morceau d’elle-même. J’ai vécu à Saint-Barth jusqu’en 2001 : une époque où l’île était encore intime, authentique, presque secrète. Une époque que seuls ceux qui l’ont vécue peuvent vraiment comprendre.
                  </p>
              </div>

              {/* The Return */}
              <div className="space-y-6 border-l-2 border-sbh-green/20 pl-6">
                  <p>
                      Puis la vie m’a ramenée à Bruxelles. J’y ai étudié l’immobilier — sans me douter que je préparais, sans le savoir, mon retour.
                  </p>
                  <p>
                      Dix ans plus tard, l’appel de Saint-Barth est revenu. Pas un simple désir… Un rappel. Parce qu’il existe des lieux qui nous choisissent, même quand nous croyons les avoir quittés.
                  </p>
                  <p>
                      Revenir n’a pas été simple. Il a fallu reconstruire, retrouver mes repères, redonner du sens à ce retour. Mais je suis restée. Parce que je savais que j’étais exactement là où je devais être, pour bâtir <strong>Sun Beach House</strong>.
                  </p>
              </div>
          </div>
      </div>

      {/* PHILOSOPHY SECTION - Centered Visual Block */}
      <div className="bg-white py-24 md:py-32 relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
              <PalmLeaf className="w-96 h-96 text-sbh-charcoal" />
          </div>

          <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
              <h3 className="font-serif text-3xl md:text-5xl italic text-sbh-charcoal mb-12 leading-tight">
                  "Aujourd’hui, mon travail n’est pas une transaction. <br/>
                  <span className="text-sbh-green">C’est une rencontre.</span>"
              </h3>

              <div className="font-sans font-light text-lg leading-relaxed text-gray-600 space-y-8 mb-16">
                  <p>
                      Je ne loue pas seulement une villa. Je crée un espace où vous pouvez vivre quelque chose :
                  </p>
                  <ul className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 font-serif italic text-xl text-sbh-charcoal">
                      <li className="flex items-center gap-2 justify-center"><NorthStar className="w-4 h-4 text-sbh-green"/> des vacances qui transforment</li>
                      <li className="flex items-center gap-2 justify-center"><NorthStar className="w-4 h-4 text-sbh-green"/> un moment qui marque</li>
                      <li className="flex items-center gap-2 justify-center"><NorthStar className="w-4 h-4 text-sbh-green"/> une expérience qui reste</li>
                  </ul>
                  <p className="max-w-2xl mx-auto pt-8">
                      Je connais les plages secrètes, les sentiers oubliés, les restaurants simples où l’on rit, les spots où le soleil tombe comme de l’or sur la mer. Je connais aussi les subtilités, les saisons, les nuances d’une île que l’on croit connaître… mais que l’on comprend réellement seulement avec le cœur.
                  </p>
              </div>

              <div className="w-16 h-px bg-sbh-charcoal/20 mx-auto mb-12"></div>

              <div className="space-y-6">
                   <h4 className="font-serif text-2xl text-sbh-charcoal">Pourquoi Sun Beach House ?</h4>
                   <p className="font-sans text-lg text-gray-600">
                       Parce qu’ici, vous n’êtes pas un dossier, ni un numéro, ni une réservation. <br/>
                       <strong className="text-sbh-charcoal font-medium">Vous êtes un invité.</strong>
                   </p>
                   <p className="font-sans text-gray-600 max-w-2xl mx-auto">
                       Je travaille avec respect, avec écoute, avec authenticité. Je crée des liens. Certains clients reviennent chaque année. Certains sont même devenus des amis. Parce qu’ici, il ne s’agit pas seulement de luxe. Il s’agit d’histoires. D’émotions. De connexions vraies.
                   </p>
              </div>
          </div>
      </div>

      {/* THE SECRET PROJECT - Distinct Visual Section */}
      <div className="max-w-[1000px] mx-auto px-6 mb-32 relative">
          <div className="bg-sbh-green/10 p-10 md:p-20 rounded-sm relative overflow-hidden">
               {/* Decorative background within box */}
               <div className="absolute -top-20 -left-20 opacity-10 text-sbh-green">
                   <SunStamp className="w-64 h-64" />
               </div>

               <div className="relative z-10 text-center">
                   <span className="font-sans text-xs uppercase tracking-[0.3em] text-sbh-charcoal/60 mb-6 block">
                       Confidence
                   </span>
                   <h3 className="font-serif text-3xl md:text-4xl italic text-sbh-charcoal mb-8">
                       Et puis… il y a autre chose.
                   </h3>
                   <div className="font-sans font-light text-lg text-sbh-charcoal/80 space-y-6 leading-relaxed max-w-2xl mx-auto">
                       <p>
                           Quelque chose qui naît doucement, presque en secret. Un projet nouveau. Un projet qui n’a rien à voir avec la location de villas… et en même temps, tout à voir avec l’essence profonde de cette île.
                       </p>
                       <p>
                           Un espace pour se reconnecter, pour ressentir, pour retrouver ce que tant ont perçu ici la première fois : cette énergie pure, simple, originelle. Un lieu ouvert à tous. Un lieu où l’on ne consomme pas l’île — où on la rencontre.
                       </p>
                       <p className="italic font-serif text-xl pt-4">
                           "Pour l’instant, ce projet n’a pas encore de nom public. Il mûrit, élégamment, comme un secret que l’on préserve avant de l’offrir au monde."
                       </p>
                       <p className="text-sm uppercase tracking-widest pt-4 opacity-70">
                           Si vous venez pour vous retrouver… ce projet vous trouvera.
                       </p>
                   </div>
               </div>
          </div>
      </div>

      {/* CONCLUSION & SIGNATURE */}
      <div className="max-w-[800px] mx-auto px-6 text-center mb-24">
          <h3 className="font-serif text-3xl md:text-5xl text-sbh-charcoal mb-8 leading-tight">
             "Saint-Barth se vit. <br/>
             <span className="italic text-gray-400 text-2xl md:text-4xl">Ce n’est pas une destination qu’on consomme."</span>
          </h3>
          <p className="font-sans text-lg text-gray-600 mb-12">
              Je suis là pour vous accompagner. Avec simplicité. Avec intégrité. Avec cette connaissance intime que seuls les anciens amoureux de l’île portent en eux.
          </p>
          
          <div className="flex flex-col items-center gap-2">
              <span className="font-serif text-2xl italic text-sbh-charcoal">Bienvenue chez Sun Beach House.</span>
              <p className="font-signature text-7xl md:text-8xl text-sbh-charcoal/80 -rotate-6 py-4">Valérie</p>
              <span className="text-[10px] uppercase tracking-widest text-gray-400">Fondatrice</span>
          </div>
      </div>

    </div>
  );
};