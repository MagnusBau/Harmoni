

class addTicketType {
    ticketTypeList: ticket[]=[];
    ticket = new ticket(
        '',
        '',
        '',
        0,
        0,

    );
    render(){
        return(
            <div>
                <Column>Bilett </Column>
                <Column>
                    <select
                        required
                        aria-required={"true"}
                        value={this.ticket.title}
                        id="select"
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.ticket) this.ticket.title = event.target.value;
                        }}>

                        <option key={"bilettType"} defaultValue="default" hidden >Velg Bletttype</option>
                        {this.ticketTypeListe.map(t => (
                            <option key={t.title + t.ticket_id} value={t.title}>{t.title}</option>
                        ))}
                    </select>
                </Column>

            </div>

        );
    }
    mounted(){

    }
}

