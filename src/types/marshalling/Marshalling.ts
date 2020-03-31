export interface Marshaller<Domain, Dto> {
    marshal(domain: Domain): Dto;
}
