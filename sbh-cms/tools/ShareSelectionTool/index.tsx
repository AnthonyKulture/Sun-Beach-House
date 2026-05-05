import React, { useState, useEffect, useMemo } from 'react'
import {
    Box,
    Card,
    Container,
    Flex,
    Heading,
    Text,
    TextInput,
    Select,
    Grid,
    Button,
    Badge,
    TextArea,
    Spinner,
    Stack
} from '@sanity/ui'
import { EnvelopeIcon, SearchIcon, CheckmarkCircleIcon, ArrowRightIcon, ArrowLeftIcon, ErrorOutlineIcon } from '@sanity/icons'
import { useClient } from 'sanity'

const POPULAR_AMENITIES = [
    "Piscine Chauffée",
    "Jacuzzi",
    "Court de Tennis",
    "Sauna / Hammam",
    "Salle de Fitness",
    "Accès Plage Direct",
    "Court de Padel",
]

const renderMessageWithBold = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => (
        <React.Fragment key={i}>
            {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j}>{part.slice(2, -2)}</strong>
                }
                return part
            })}
            {i !== text.split('\n').length - 1 && <br />}
        </React.Fragment>
    ))
}

const VILLA_QUERY = `*[_type == "villa"] | order(name asc) {
  _id,
  name,
  listingType,
  pricePerNight,
  pricePerWeek,
  salePrice,
  bedrooms,
  "locationName": location->name,
  "imageUrl": mainImage.asset->url,
  "amenities": amenities[]->{name}
}`

const defaultMessageFr = `Cher/Chère [Nom du client],

Nous vous remercions pour votre confiance et serions ravis de vous accompagner dans l’organisation de votre séjour à Saint-Barthélemy, du [date d’arrivée] au [date de départ].

Vous trouverez ci-dessous une sélection de villas d’exception, soigneusement présélectionnées selon vos critères et disponibles aux dates souhaitées.

Au-delà de la villa, Sun Beach House vous propose un service de conciergerie haut de gamme, pensé comme une véritable expérience sur mesure : discrète, fluide et entièrement dédiée à votre confort. Chaque détail est anticipé en amont afin que votre séjour se déroule en toute sérénité.

Nous vous accompagnons dans l’organisation de l’ensemble de votre séjour en prenant en charge toutes vos réservations :
– Restaurants et beach clubs
– Location de véhicules (avec ou sans chauffeur)
– Transferts, voyages et assistance aéroport (Saint-Martin ou autres)
– Sorties en bateau, yachts privés et activités nautiques
– Expériences personnalisées sur l’île

Notre rôle est de vous conseiller, organiser et réserver pour vous, afin que vous n’ayez à vous soucier de rien. Ces prestations sont organisées sur mesure et restent à votre charge.

Sont inclus dans votre séjour :
– Un accueil personnalisé à l’aéroport ou au port
– Le transfert jusqu’à votre villa avec assistance à l’arrivée
– Un service de conciergerie dédié 24h/24 – 7j/7
– Le ménage (6 jours sur 7, parfois 7 jours sur 7 selon la villa, hors dimanches et jours fériés)
– La gestion et coordination de vos réservations avant et pendant votre séjour

Sur place, notre équipe reste disponible à tout moment pour vous accompagner, ajuster et orchestrer chaque détail de votre expérience.

Pour aller encore plus loin dans la personnalisation de votre séjour, des services complémentaires peuvent être organisés à la carte (en supplément), tels que : chef privé, service de butler, soins bien-être, coaching sportif, etc.

Nous vous invitons à découvrir plus en détail notre service de conciergerie :
https://www.sun-beach-house.com/en/conciergerie

Nous restons bien entendu à votre entière disposition pour toute information complémentaire et pour affiner cette sélection afin de trouver la villa parfaitement adaptée à votre séjour.

`;

const defaultMessageEn = `Dear [Client Name],

Thank you for your trust. We would be delighted to assist you in organizing your stay in Saint-Barthélemy, from [arrival date] to [departure date].

Below, you will find a selection of exceptional villas, carefully pre-selected according to your criteria and available for your desired dates.

Beyond the villa, Sun Beach House offers a high-end concierge service, designed as a truly tailor-made experience: discreet, seamless, and entirely dedicated to your comfort. Every detail is anticipated in advance so that your stay unfolds in complete serenity.

We accompany you in organizing your entire stay by taking care of all your reservations:
– Restaurants and beach clubs
– Vehicle rentals (with or without a driver)
– Transfers, travel, and airport assistance (Saint-Martin or others)
– Boat trips, private yachts, and water activities
– Personalized experiences on the island

Our role is to advise, organize, and book for you, so you don't have to worry about a thing. These services are tailor-made and remain at your expense.

Included in your stay:
– A personalized welcome at the airport or port
– Transfer to your villa with arrival assistance
– A dedicated 24/7 concierge service
– Housekeeping (6 days a week, sometimes 7 depending on the villa, excluding Sundays and public holidays)
– Management and coordination of your reservations before and during your stay

On site, our team remains available at all times to accompany you, adjust, and orchestrate every detail of your experience.

To go even further in personalizing your stay, additional à la carte services can be arranged (at an extra cost), such as: private chef, butler service, wellness treatments, sports coaching, etc.

We invite you to discover our concierge service in more detail:
https://www.sun-beach-house.com/en/conciergerie

We remain, of course, at your entire disposal for any further information and to refine this selection to find the perfect villa for your stay.

`;

const defaultSubjectFr = 'Votre sélection de villas par Sun-Beach-House';
const defaultSubjectEn = 'Your villa selection by Sun-Beach-House';

const defaultMessageEs = `Estimado/a [Nombre del cliente],

Le agradecemos su confianza y estaremos encantados de acompañarle en la organización de su estancia en San Bartolomé, del [fecha de llegada] al [fecha de salida].

A continuación, encontrará una selección de villas excepcionales, cuidadosamente preseleccionadas según sus criterios y disponibles en las fechas deseadas.

Más allá de la villa, Sun Beach House le ofrece un servicio de conserjería de alta gama, pensado como una verdadera experiencia a medida: discreta, fluida y completamente dedicada a su comodidad. Cada detalle se anticipa con antelación para que su estancia se desarrolle con total serenidad.

Le acompañamos en la organización de toda su estancia gestionando todas sus reservas:
– Restaurantes y clubes de playa
– Alquiler de vehículos (con o sin conductor)
– Traslados, viajes y asistencia en el aeropuerto (San Martín u otros)
– Paseos en barco, yates privados y actividades acuáticas
– Experiencias personalizadas en la isla

Nuestro papel es asesorarle, organizar y reservar por usted, para que no tenga que preocuparse por nada. Estos servicios son a medida y corren por su cuenta.

Se incluyen en su estancia:
– Una bienvenida personalizada en el aeropuerto o puerto
– El traslado a su villa con asistencia a la llegada
– Un servicio de conserjería dedicado 24/7
– Limpieza (6 días a la semana, a veces 7 dependiendo de la villa, excepto domingos y festivos)
– La gestión y coordinación de sus reservas antes y durante su estancia

In situ, nuestro equipo permanece disponible en todo momento para acompañarle, ajustar y orquestar cada detalle de su experiencia.

Para ir aún más lejos en la personalización de su estancia, se pueden organizar servicios adicionales a la carta (con costo extra), tales como: chef privado, servicio de mayordomo, tratamientos de bienestar, entrenamiento deportivo, etc.

Le invitamos a descubrir más en detalle nuestro servicio de conserjería:
https://www.sun-beach-house.com/en/conciergerie

Quedamos, por supuesto, a su entera disposición para cualquier información adicional y para refinar esta selección con el fin de encontrar la villa perfectamente adaptada a su estancia.

`;

const defaultMessagePt = `Prezado/a [Nome do cliente],

Agradecemos a sua confiança e teríamos o maior prazer em acompanhá-lo na organização da sua estadia em Saint-Barthélemy, de [data de chegada] a [data de partida].

Abaixo, você encontrará uma seleção de vilas excepcionais, cuidadosamente pré-selecionadas de acordo com seus critérios e disponíveis nas datas desejadas.

Além da vila, a Sun Beach House oferece um serviço de concierge de alto padrão, pensado como uma verdadeira experiência sob medida: discreto, fluido e totalmente dedicado ao seu conforto. Cada detalhe é antecipado com antecedência para que a sua estadia transcorra com total serenidade.

Acompanhamos você na organização de toda a sua estadia, cuidando de todas as suas reservas:
– Restaurantes e clubes de praia
– Aluguel de veículos (com ou sem motorista)
– Transfers, viagens e assistência no aeroporto (Saint-Martin ou outros)
– Passeios de barco, iates privados e atividades náuticas
– Experiências personalizadas na ilha

O nosso papel é aconselhá-lo, organizar e reservar por você, para que não tenha de se preocupar com nada. Esses serviços são sob medida e ficam por sua conta.

Estão incluídos na sua estadia:
– Uma recepção personalizada no aeroporto ou porto
– O transfer para a sua vila com assistência à chegada
– Um serviço de concierge dedicado 24/7
– Limpeza (6 dias por semana, por vezes 7 dependendo da vila, exceto domingos e feriados)
– A gestão e coordenação de suas reservas antes e durante a sua estadia

No local, nossa equipe permanece disponível em todos os momentos para acompanhá-lo, ajustar e orquestrar cada detalhe da sua experiência.

Para ir ainda mais longe na personalização da sua estadia, podem ser organizados serviços adicionais à la carte (com custo extra), tais como: chef privado, serviço de mordomo, tratamentos de bem-estar, coaching esportivo, etc.

Convidamos você a descobrir mais detalhadamente o nosso serviço de concierge:
https://www.sun-beach-house.com/en/conciergerie

Continuamos, obviamente, à sua inteira disposição para qualquer informação adicional e para refinar esta seleção a fim de encontrar a vila perfeitamente adaptada à sua estadia.

`;

const defaultSubjectEs = 'Su selección de villas por Sun-Beach-House';
const defaultSubjectPt = 'Sua seleção de vilas por Sun-Beach-House';

export function ShareSelectionTool() {
    const client = useClient({ apiVersion: '2024-03-01' })
    const [villas, setVillas] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const [step, setStep] = useState<1 | 2>(1)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    // Filters
    const [searchTerm, setSearchTerm] = useState('')
    const [listingType, setListingType] = useState('')
    const [location, setLocation] = useState('')
    const [bedrooms, setBedrooms] = useState('')
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

    // Form
    const [clientEmail, setClientEmail] = useState('')
    const [subject, setSubject] = useState(defaultSubjectFr)
    const [message, setMessage] = useState(defaultMessageFr)
    const [lang, setLang] = useState<'fr' | 'en' | 'es' | 'pt'>('fr')

    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        client.fetch(VILLA_QUERY).then((res: any[]) => {
            const deduplicated = res.reduce((acc, villa) => {
                const isDraft = villa._id.startsWith('drafts.')
                const publishedId = isDraft ? villa._id.replace('drafts.', '') : villa._id
                if (isDraft) {
                    acc[publishedId] = villa
                } else if (!acc[publishedId]) {
                    acc[publishedId] = villa
                }
                return acc
            }, {} as Record<string, any>)
            
            setVillas(Object.values(deduplicated))
            setLoading(false)
        }).catch(err => {
            console.error(err)
            setErrorMessage('Erreur lors du chargement des villas')
            setLoading(false)
        })
    }, [client])

    const locations = useMemo(() => {
        const locs = new Set(villas.map(v => v.locationName).filter(Boolean))
        return Array.from(locs).sort() as string[]
    }, [villas])

    const filteredVillas = useMemo(() => {
        return villas.filter(villa => {
            const matchSearch = villa.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchType = listingType ? villa.listingType === listingType : true
            const matchLocation = location ? villa.locationName === location : true
            const matchBedrooms = bedrooms ? villa.bedrooms >= parseInt(bedrooms, 10) : true
            const matchAmenities = selectedAmenities.length === 0 || selectedAmenities.every(filterAmenity =>
                (villa.amenities || []).some((a: any) =>
                    (a?.name || '').toLowerCase() === filterAmenity.toLowerCase()
                )
            )
            return matchSearch && matchType && matchLocation && matchBedrooms && matchAmenities
        })
    }, [villas, searchTerm, listingType, location, bedrooms, selectedAmenities])

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        )
    }

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedIds)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedIds(newSelected)
    }

    const handleSend = async () => {
        if (!clientEmail || !subject) {
            setErrorMessage("L'email et le sujet sont obligatoires.")
            setStatus('error')
            return
        }

        setStatus('sending')
        setErrorMessage('')

        try {
            const apiUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
            const response = await fetch(`${apiUrl}/api/send-selection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientEmail,
                    subject,
                    message,
                    villaIds: Array.from(selectedIds),
                    lang
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Une erreur est survenue lors de l\'envoi")
            }

            setStatus('success')
        } catch (err: any) {
            setStatus('error')
            setErrorMessage(err.message || 'Erreur réseau de communication avec Next.js.')
        }
    }

    if (loading) {
        return (
            <Flex align="center" justify="center" height="fill" style={{ minHeight: '50vh' }}>
                <Spinner muted />
            </Flex>
        )
    }

    if (step === 2) {
        if (status === 'success') {
            return (
                <Container width={1} padding={4}>
                    <Card padding={5} radius={3} shadow={1} tone="positive">
                        <Stack space={4} style={{ textAlign: 'center' }}>
                            <Text size={4}><CheckmarkCircleIcon /></Text>
                            <Heading>Email envoyé avec succès !</Heading>
                            <Text>La sélection de {selectedIds.size} villa(s) a été envoyée à <strong>{clientEmail}</strong>.</Text>
                            <Box marginTop={4}>
                                <Button
                                    text="Faire une nouvelle sélection"
                                    tone="primary"
                                    onClick={() => {
                                        setSelectedIds(new Set())
                                        setStep(1)
                                        setStatus('idle')
                                        setClientEmail('')
                                    }}
                                />
                            </Box>
                        </Stack>
                    </Card>
                </Container>
            )
        }

        return (
            <Container width={4} padding={4}>
                <Box marginBottom={4}>
                    <Button
                        icon={ArrowLeftIcon}
                        text="Retour à la sélection"
                        mode="bleed"
                        onClick={() => setStep(1)}
                    />
                </Box>

                <Grid columns={[1, 1, 2]} gap={4}>
                    <Card padding={4} radius={3} shadow={1}>
                        <Stack space={4}>
                            <Flex align="center" justify="space-between">
                                <Flex align="center" gap={2}>
                                    <Text size={3}><EnvelopeIcon /></Text>
                                    <Heading as="h2" size={2}>Paramètres de l'email</Heading>
                                </Flex>
                                <Flex gap={2}>
                                    <Button
                                        mode={lang === 'fr' ? 'default' : 'ghost'}
                                        tone={lang === 'fr' ? 'primary' : 'default'}
                                        text="FR"
                                        padding={2}
                                        fontSize={1}
                                        onClick={() => {
                                           setLang('fr');
                                           if ([defaultMessageEn, defaultMessageEs, defaultMessagePt].includes(message)) setMessage(defaultMessageFr);
                                           if ([defaultSubjectEn, defaultSubjectEs, defaultSubjectPt].includes(subject)) setSubject(defaultSubjectFr);
                                        }}
                                    />
                                    <Button
                                        mode={lang === 'en' ? 'default' : 'ghost'}
                                        tone={lang === 'en' ? 'primary' : 'default'}
                                        text="EN"
                                        padding={2}
                                        fontSize={1}
                                        onClick={() => {
                                           setLang('en');
                                           if ([defaultMessageFr, defaultMessageEs, defaultMessagePt].includes(message)) setMessage(defaultMessageEn);
                                           if ([defaultSubjectFr, defaultSubjectEs, defaultSubjectPt].includes(subject)) setSubject(defaultSubjectEn);
                                        }}
                                    />
                                    <Button
                                        mode={lang === 'es' ? 'default' : 'ghost'}
                                        tone={lang === 'es' ? 'primary' : 'default'}
                                        text="ES"
                                        padding={2}
                                        fontSize={1}
                                        onClick={() => {
                                           setLang('es');
                                           if ([defaultMessageFr, defaultMessageEn, defaultMessagePt].includes(message)) setMessage(defaultMessageEs);
                                           if ([defaultSubjectFr, defaultSubjectEn, defaultSubjectPt].includes(subject)) setSubject(defaultSubjectEs);
                                        }}
                                    />
                                    <Button
                                        mode={lang === 'pt' ? 'default' : 'ghost'}
                                        tone={lang === 'pt' ? 'primary' : 'default'}
                                        text="PT"
                                        padding={2}
                                        fontSize={1}
                                        onClick={() => {
                                           setLang('pt');
                                           if ([defaultMessageFr, defaultMessageEn, defaultMessageEs].includes(message)) setMessage(defaultMessagePt);
                                           if ([defaultSubjectFr, defaultSubjectEn, defaultSubjectEs].includes(subject)) setSubject(defaultSubjectPt);
                                        }}
                                    />
                                </Flex>
                            </Flex>

                            <Card padding={4} radius={2} tone="transparent" border>
                                <Stack space={4}>
                                    <Stack space={3}>
                                        <Text weight="semibold" size={1}>Email du client *</Text>
                                        <TextInput
                                            type="email"
                                            placeholder="client@exemple.com"
                                            value={clientEmail}
                                            onChange={(e: any) => setClientEmail(e.currentTarget.value)}
                                        />

                                    </Stack>

                                    <Stack space={3}>
                                        <Text weight="semibold" size={1}>Sujet de l'email *</Text>
                                        <TextInput
                                            type="text"
                                            value={subject}
                                            onChange={(e: any) => setSubject(e.currentTarget.value)}
                                        />
                                    </Stack>

                                    <Stack space={3}>
                                        <Text weight="semibold" size={1}>Message personnalisé</Text>
                                        <TextArea
                                            rows={6}
                                            value={message}
                                            onChange={(e: any) => setMessage(e.currentTarget.value)}
                                        />
                                    </Stack>

                                    {status === 'error' && (
                                        <Card padding={3} radius={2} tone="critical">
                                            <Flex align="center" gap={2}>
                                                <Text><ErrorOutlineIcon /></Text>
                                                <Text size={1}>{errorMessage}</Text>
                                            </Flex>
                                        </Card>
                                    )}

                                    <Box marginTop={3}>
                                        <Button
                                            text={status === 'sending' ? 'Envoi en cours...' : `Envoyer la sélection (${selectedIds.size} villas)`}
                                            tone="primary"
                                            iconRight={status === 'sending' ? undefined : ArrowRightIcon}
                                            disabled={status === 'sending' || selectedIds.size === 0 || !clientEmail || !subject}
                                            onClick={handleSend}
                                            style={{ width: '100%', justifyContent: 'center' }}
                                        />
                                    </Box>
                                </Stack>
                            </Card>
                        </Stack>
                    </Card>

                    {/* Email Preview Panel */}
                    <Card padding={4} radius={3} shadow={1} style={{ backgroundColor: '#f3f4f6', height: '100%', overflowY: 'auto' }}>
                        <Box style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                            <Box padding={4}>
                                {/* Message */}
                                {message && (
                                    <Box marginBottom={4} style={{ whiteSpace: 'pre-wrap' }}>
                                        <Text size={2} style={{ color: '#374151', lineHeight: 1.6 }}>
                                            {renderMessageWithBold(message)}
                                        </Text>
                                    </Box>
                                )}

                                <Box marginBottom={4} style={{ borderBottom: '1px solid #e5e7eb' }} />

                                <Heading as="h3" size={2} style={{ marginBottom: '24px', color: '#2D2D2D' }}>
                                    {lang === 'en' ? 'Our Exclusive Selection' : lang === 'es' ? 'Nuestra Selección Exclusiva' : lang === 'pt' ? 'Nossa Seleção Exclusiva' : 'Notre Sélection Exclusive'}
                                </Heading>

                                <Stack space={4}>
                                    {Array.from(selectedIds).map(id => {
                                        const villa = villas.find(v => v._id === id)
                                        if (!villa) return null

                                        return (
                                            <Card key={id} border radius={2} style={{ overflow: 'hidden' }}>
                                                {villa.imageUrl && (
                                                    <Box style={{ aspectRatio: '16/9', backgroundColor: '#eee' }}>
                                                        <img src={villa.imageUrl} alt={villa.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </Box>
                                                )}
                                                <Box padding={3} style={{ backgroundColor: '#fff' }}>
                                                    <Box marginBottom={2}>
                                                        <Badge tone="default">{villa.listingType === 'sale' ? (lang === 'en' ? 'Sale' : lang === 'es' ? 'Venta' : lang === 'pt' ? 'Venda' : 'Vente') : (lang === 'en' ? 'Rent' : lang === 'es' ? 'Alquiler' : lang === 'pt' ? 'Aluguel' : 'Location')}</Badge>
                                                    </Box>
                                                    <Heading as="h4" size={2} style={{ marginBottom: '8px', color: '#2D2D2D' }}>{villa.name}</Heading>
                                                    <Text size={1} weight="semibold" style={{ color: '#A05C4D', textTransform: 'uppercase' }}>
                                                        {villa.locationName} • {villa.bedrooms} {lang === 'en' ? 'bedrooms' : lang === 'es' ? 'habitaciones' : lang === 'pt' ? 'quartos' : 'chambres'}
                                                    </Text>
                                                    <Box marginTop={3}>
                                                        <Button text={lang === 'en' ? 'Discover this property' : lang === 'es' ? 'Descubrir esta propiedad' : lang === 'pt' ? 'Descobrir esta propriedade' : 'Découvrir cette propriété'} tone="primary" style={{ backgroundColor: '#1A3C34', color: '#F6F5F1', borderColor: '#1A3C34' }} fontSize={1} padding={2} />
                                                    </Box>
                                                </Box>
                                            </Card>
                                        )
                                    })}
                                </Stack>

                                <Box marginTop={5} style={{ textAlign: 'left' }}>
                                    <Text size={2} style={{ color: '#374151', lineHeight: 1.6, marginBottom: '24px', whiteSpace: 'pre-wrap' }}>
                                        {lang === 'en' ? `Best regards,\nValérie Kerckhofs\nSun Beach House\n\nMaking every stay in Saint-Barthélemy a unique moment.` :
                                         lang === 'es' ? `Atentamente,\nValérie Kerckhofs\nSun Beach House\n\nHaciendo de cada estancia en San Bartolomé un momento único.` :
                                         lang === 'pt' ? `Atenciosamente,\nValérie Kerckhofs\nSun Beach House\n\nFazendo de cada estadia em Saint-Barthélemy um momento único.` :
                                         `Bien cordialement,\nValérie Kerckhofs\nSun Beach House\n\nFaire de chaque séjour à Saint-Barthélemy un moment unique.`}
                                    </Text>
                                    <a href="https://www.sun-beach-house.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                                        <img src={`${process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'}/signature.png?v=2`} alt="Signature Sun Beach House" style={{ width: '100%', maxWidth: '600px', height: 'auto', display: 'block', margin: '0', border: 'none' }} />
                                    </a>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Container>
        )
    }

    return (
        <Container width={3} padding={4}>
            <Stack space={5}>
                <Flex align="center" justify="space-between">
                    <Box>
                        <Heading as="h1" size={3}>Sélection de Villas ({selectedIds.size} sélectionnées)</Heading>
                        <Box marginTop={2}>
                            <Text size={1} muted>Recherchez et ajoutez des villas pour générer un email personnalisé.</Text>
                        </Box>
                    </Box>

                    <Button
                        text="Rédiger l'email"
                        iconRight={ArrowRightIcon}
                        tone="primary"
                        disabled={selectedIds.size === 0}
                        onClick={() => setStep(2)}
                    />
                </Flex>

                {/* Filters */}
                <Grid columns={[1, 2, 4]} gap={3}>
                    <TextInput
                        icon={SearchIcon}
                        placeholder="Rechercher par nom..."
                        value={searchTerm}
                        onChange={(e: any) => setSearchTerm(e.currentTarget.value)}
                    />
                    <Select value={listingType} onChange={(e: any) => setListingType(e.currentTarget.value)}>
                        <option value="">Tous les types</option>
                        <option value="rent">Location</option>
                        <option value="sale">Vente</option>
                    </Select>
                    <Select value={location} onChange={(e: any) => setLocation(e.currentTarget.value)}>
                        <option value="">Tous les quartiers</option>
                        {locations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </Select>
                    <Select value={bedrooms} onChange={(e: any) => setBedrooms(e.currentTarget.value)}>
                        <option value="">Capacité (Chambres)</option>
                        <option value="1">1+ chambre</option>
                        <option value="2">2+ chambres</option>
                        <option value="3">3+ chambres</option>
                        <option value="4">4+ chambres</option>
                        <option value="5">5+ chambres</option>
                        <option value="6">6+ chambres</option>
                        <option value="7">7+ chambres</option>
                        <option value="8">8+ chambres</option>
                        <option value="9">9+ chambres</option>
                        <option value="10">10+ chambres</option>
                    </Select>
                </Grid>

                {/* Equipements Filter */}
                <Box>
                    <Text size={1} weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>Équipements</Text>
                    <Flex wrap="wrap" gap={2}>
                        {POPULAR_AMENITIES.map(amenity => {
                            const isActive = selectedAmenities.includes(amenity)
                            return (
                                <button
                                    key={amenity}
                                    onClick={() => toggleAmenity(amenity)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '4px 12px',
                                        borderRadius: '9999px',
                                        border: `1px solid ${isActive ? 'var(--card-focus-ring-color)' : 'var(--card-border-color)'}`,
                                        backgroundColor: isActive ? 'var(--card-focus-ring-color)' : 'transparent',
                                        color: isActive ? '#fff' : 'inherit',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        fontFamily: 'inherit',
                                        transition: 'all 0.15s ease',
                                    }}
                                >
                                    {isActive && <CheckmarkCircleIcon style={{ width: 14, height: 14 }} />}
                                    {amenity}
                                </button>
                            )
                        })}
                        {selectedAmenities.length > 0 && (
                            <button
                                onClick={() => setSelectedAmenities([])}
                                style={{
                                    padding: '4px 12px',
                                    borderRadius: '9999px',
                                    border: '1px solid var(--card-border-color)',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    color: 'var(--card-muted-fg-color)',
                                    fontFamily: 'inherit',
                                }}
                            >
                                Réinitialiser
                            </button>
                        )}
                    </Flex>
                </Box>

                {/* Grid */}
                <Grid columns={[1, 2, 3, 4]} gap={4}>
                    {filteredVillas.map(villa => {
                        const isSelected = selectedIds.has(villa._id)
                        const price = villa.listingType === 'sale'
                            ? `${(villa.salePrice || 0).toLocaleString('fr-FR')} €`
                            : `$${(villa.pricePerWeek || villa.pricePerNight || 0).toLocaleString('en-US')} / sem`

                        return (
                            <Card
                                key={villa._id}
                                radius={3}
                                shadow={isSelected ? 3 : 1}
                                tone={isSelected ? 'primary' : 'default'}
                                style={{ overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', border: isSelected ? '2px solid var(--card-focus-ring-color)' : '2px solid transparent' }}
                                onClick={() => toggleSelection(villa._id)}
                            >
                                <Box style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: '#e5e7eb' }}>
                                    {villa.imageUrl && (
                                        <img src={villa.imageUrl} alt={villa.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    )}
                                    {isSelected && (
                                        <Box style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'var(--card-bg-color)', borderRadius: '50%', padding: 2 }}>
                                            <div style={{ color: 'green', display: 'flex' }}><CheckmarkCircleIcon /></div>
                                        </Box>
                                    )}
                                    <Box style={{ position: 'absolute', bottom: 8, left: 8 }}>
                                        <Badge tone="default">{villa.listingType === 'sale' ? 'Vente' : 'Location'}</Badge>
                                    </Box>
                                </Box>
                                <Box padding={3}>
                                    <Stack space={3}>
                                        <Box>
                                            <Text weight="bold" size={2} style={{ display: 'block' }}>{villa.name}</Text>
                                            <Box marginTop={2}>
                                                <Text size={1} muted>{villa.locationName || 'N/A'} • {villa.bedrooms} ch.</Text>
                                            </Box>
                                        </Box>
                                        <Badge tone="default" style={{ alignSelf: 'flex-start' }}>{price}</Badge>
                                    </Stack>
                                </Box>
                            </Card>
                        )
                    })}
                </Grid>

                {filteredVillas.length === 0 && (
                    <Card padding={5} radius={3} tone="transparent" style={{ textAlign: 'center' }}>
                        <Text muted>Aucune villa ne correspond à votre recherche.</Text>
                    </Card>
                )}

            </Stack>
        </Container>
    )
}
