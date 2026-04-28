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

const defaultMessageFr = `Cher ……….

Nous vous remercions pour votre confiance et serions ravis de vous accompagner pour votre séjour à Saint-Barthélemy, du date arrivée/date de départ

Vous trouverez ci-dessous une **sélection de villas d’exception**, personnellement présélectionnées selon vos critères et **disponibles aux dates souhaitées**.

Au-delà de la villa, Sun Beach House vous propose un accompagnement de type **haute conciergerie**, pensé comme un service de **butler** : discret, constant, et entièrement tourné vers votre confort. **Tout est préparé en amont**, avant votre arrivée, afin que votre séjour se déroule avec une parfaite fluidité.

Nous organisons et réservons, selon vos souhaits : **restaurants et beach clubs**, transferts, **véhicules avec ou sans chauffeur**, expériences sur mesure, ainsi que l’ensemble des services à la villa. Sur place, notre équipe reste disponible à tout moment pour ajuster, confirmer et orchestrer chaque détail, **jusqu’à votre départ**.

**Les tarifs indiqués incluent notamment** :

Un accueil personnalisé à votre arrivée (aéroport ou ferry)
Le transfert jusqu’à la villa, ainsi qu’une visite d’arrivée
Un service de conciergerie **24h/24 – 7j/7**
Le ménage **6 jours par semaine** (hors dimanches et jours fériés)
Nous restons bien entendu à votre entière disposition pour toute information complémentaire, et pour affiner cette sélection afin d’identifier la villa la plus parfaitement adaptée à votre séjour.

Bien cordialement,
Valérie Kerckhofs`;

const defaultMessageEn = `Dear ……….

Thank you for your trust. We would be delighted to assist you with your stay in Saint-Barthélemy, from arrival date/departure date.

Below, you will find a **selection of exceptional villas**, personally pre-selected according to your criteria and **available for your desired dates**.

Beyond the villa, Sun Beach House offers a **high-end concierge** service, designed like a **butler** service: discreet, constant, and entirely focused on your comfort. **Everything is prepared in advance**, before your arrival, so that your stay unfolds flawlessly.

We organize and book, according to your wishes: **restaurants and beach clubs**, transfers, **vehicles with or without a driver**, tailor-made experiences, as well as all services at the villa. On site, our team remains available at all times to adjust, confirm, and orchestrate every detail, **until your departure**.

**The rates indicated notably include**:

A personalized welcome upon your arrival (airport or ferry)
Transfer to the villa, as well as an arrival tour
A **24/7** concierge service
Housekeeping **6 days a week** (excluding Sundays and public holidays)
We remain at your entire disposal for any further information, and to refine this selection in order to identify the villa perfectly suited to your stay.

Best regards,
Valérie Kerckhofs`;

const defaultSubjectFr = 'Votre sélection de villas par Sun-Beach-House';
const defaultSubjectEn = 'Your villa selection by Sun-Beach-House';

const defaultMessageEs = `Estimado/a ……….

Le agradecemos su confianza y estaremos encantados de acompañarle en su estancia en San Bartolomé, del [fecha de llegada] al [fecha de salida].

A continuación, encontrará una **selección de villas excepcionales**, preseleccionadas personalmente según sus criterios y **disponibles en las fechas deseadas**.

Más allá de la villa, Sun Beach House le ofrece un servicio de **alta conserjería**, diseñado como un servicio de **mayordomo**: discreto, constante y completamente centrado en su comodidad. **Todo se prepara con antelación**, antes de su llegada, para que su estancia se desarrolle con perfecta fluidez.

Organizamos y reservamos, según sus deseos: **restaurantes y clubes de playa**, traslados, **vehículos con o sin conductor**, experiencias a medida, así como todos los servicios en la villa. In situ, nuestro equipo permanece disponible en todo momento para ajustar, confirmar y orquestar cada detalle, **hasta su partida**.

**Las tarifas indicadas incluyen notablemente**:

Una bienvenida personalizada a su llegada (aeropuerto o ferry)
El traslado a la villa, así como un recorrido de llegada
Un servicio de conserjería **24/7**
Limpieza **6 días a la semana** (excepto domingos y festivos)
Quedamos a su entera disposición para cualquier información adicional y para refinar esta selección con el fin de identificar la villa que mejor se adapte a su estancia.

Atentamente,
Valérie Kerckhofs`;

const defaultMessagePt = `Prezado/a ……….

Agradecemos a sua confiança e teríamos o maior prazer em acompanhá-lo na sua estadia em Saint-Barthélemy, de [data de chegada] a [data de partida].

Abaixo, você encontrará uma **seleção de vilas excepcionais**, pré-selecionadas pessoalmente de acordo com seus critérios e **disponíveis nas datas desejadas**.

Além da vila, a Sun Beach House oferece um serviço de **alta conciergerie**, projetado como um serviço de **mordomo**: discreto, constante e totalmente voltado para o seu conforto. **Tudo é preparado com antecedência**, antes da sua chegada, para que a sua estadia transcorra com perfeita fluidez.

Organizamos e reservamos, de acordo com os seus desejos: **restaurantes e clubes de praia**, transfers, **veículos com ou sem motorista**, experiências sob medida, bem como todos os serviços na vila. No local, nossa equipe permanece disponível em todos os momentos para ajustar, confirmar e orquestrar cada detalhe, **até a sua partida**.

**As tarifas indicadas incluem notavelmente**:

Uma recepção personalizada à sua chegada (aeroporto ou ferry)
O transfer para a vila, bem como um tour de chegada
Um serviço de concierge **24/7**
Limpeza **6 dias por semana** (exceto domingos e feriados)
Continuamos à sua inteira disposição para qualquer informação adicional e para refinar esta seleção a fim de identificar a vila perfeitamente adequada à sua estadia.

Atenciosamente,
Valérie Kerckhofs`;

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
