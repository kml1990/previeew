export interface Unmarshaller<Dto, Domain> {
    unmarshal(dto: Dto): Domain;
}
